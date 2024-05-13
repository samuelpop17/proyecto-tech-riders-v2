import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Charla } from 'src/app/models/Charla';
import { EstadoCharla } from 'src/app/models/EstadoCharla';
import { Usuario } from 'src/app/models/Usuario';
import { ServiceCharlas } from 'src/app/services/service.charlas';
import { ServiceEmail } from 'src/app/services/service.email';
import { ServiceEstadosCharlas } from 'src/app/services/service.estadoscharlas';
import { ServiceQueryTools } from 'src/app/services/service.querytools';
import { ServiceUsuarios } from 'src/app/services/service.usuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-charlasprofesor',
  templateUrl: './charlasprofesor.component.html',
  styleUrls: ['./charlasprofesor.component.css'],
})
export class CharlasprofesorComponent implements OnInit {
  public charlas!: any[];
  public charlasFiltradas!: any[];
  public estados!: EstadoCharla[];
  public charlasCargadas: boolean = false;
  private cursos!: any[];
  public role!: number | null;

  @ViewChild('selectestado') selectEstado!: ElementRef;

  constructor(
    private _serviceQueryTools: ServiceQueryTools,
    private _serviceEstadosCharlas: ServiceEstadosCharlas,
    private _serviceCharlas: ServiceCharlas,
    private _serviceEmail: ServiceEmail,
    private _serviceUsuarios: ServiceUsuarios,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) this._router.navigate(['/login']);

    this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 2) {
      let id = parseInt(localStorage.getItem('idUsuario') ?? '0');
      this._serviceQueryTools.getCharlasView().subscribe((response) => {
        this.charlas = response;
        this._serviceQueryTools.findCursosProfesor(id).subscribe((response) => {
          this.cursos = response;
          this.cursos = this.cursos.map((curso) => curso.idCurso);
          this.charlas = this.charlas.filter((charla) =>
            this.cursos.includes(charla.idCurso)
          );
          this.charlasFiltradas = this.charlas;
          this.charlasCargadas = true;
        });
      });
      this._serviceEstadosCharlas.getEstadosCharlas().subscribe((response) => {
        this.estados = response;
      });
    } else this._router.navigate(['/usuario/perfil']);
  }

  filtrarCharlas(): void {
    let estado = this.selectEstado.nativeElement.selectedOptions[0].value;
    if (estado == 0) this.charlasFiltradas = this.charlas;
    else {
      this.charlasFiltradas = this.charlas.filter(
        (charla) => charla.idEstadoCharla == estado
      );
    }
  }

  recargarCharlas(): void {
    this.charlasCargadas = false;
    this._serviceQueryTools.getCharlasView().subscribe((response) => {
      this.charlas = response;
      this.charlas = this.charlas.filter((charla) =>
        this.cursos.includes(charla.idCurso)
      );
      this.charlasFiltradas = this.charlas;
      this.charlasCargadas = true;
    });
  }

  cancelarCharla(idCharla: number): void {
    Swal.fire({
      cancelButtonText: 'No',
      color: '#333333',
      confirmButtonColor: '#212529',
      confirmButtonText: 'Si, cancelar',
      icon: 'question',
      showCancelButton: true,
      text: 'No podrás revertir esta acción',
      title: '¿Quieres cancelar esta charla?',
    }).then((result) => {
      if (result.isConfirmed) {
        // ESTADO CANCELADA: ID 1
        this._serviceCharlas
          .updateEstadoCharla(idCharla, 1)
          .subscribe((response) => {
            Swal.fire({
              color: '#333333',
              icon: 'success',
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true,
              title: 'Charla cancelada',
            });
            this._serviceCharlas.findCharla(idCharla).subscribe((response) => {
              let charla: Charla = response;
              this._serviceQueryTools.getCursosProfesorAll().subscribe((response) => {
                let cursosProfesores: any[] = response;
                let correos: string[] = [];
                cursosProfesores.forEach(element => {
                  if (element.idCurso == charla.idCurso)
                    correos.push(element.emailProfesor);
                });
                if (charla.idTechRider != 0 || charla.idTechRider != null) {
                  this._serviceUsuarios.findUsuario(charla.idTechRider || 0).subscribe((response) => {
                    let usuario: Usuario = response;
                    correos.push(usuario.email);
                    this._serviceUsuarios.getUsuarios().subscribe((response) => {
                      let usuarios: Usuario[] = response;
                      usuarios = usuarios.filter(
                        (usu) => usu.idEmpresaCentro == usuario.idEmpresaCentro && usu.idRole == 4
                      );
                      usuarios.forEach(usu => {
                        correos.push(usu.email);
                      });
                      let asunto: string = "INFO CHARLA TECH RIDERS";
                      let mensaje: string = "Charla cancelada";
                      this._serviceEmail.enviarMail(correos, asunto, mensaje).subscribe(() => {
                        this.recargarCharlas();
                      });
                    });
                  });
                }
              });
            });
          });
        }
    });
  }

  completarCharla(idCharla: number): void {
    Swal.fire({
      cancelButtonText: 'No',
      color: '#333333',
      confirmButtonColor: '#212529',
      confirmButtonText: 'Si, completar',
      icon: 'question',
      showCancelButton: true,
      text: 'Esto significa que el Tech Rider ya ha realizado esta charla',
      title: '¿Quieres completar esta charla?',
    }).then((result) => {
      if (result.isConfirmed) {
        // ESTADO COMPLETADA: ID 5
        this._serviceCharlas
          .updateEstadoCharla(idCharla, 5)
          .subscribe((response) => {
            Swal.fire({
              color: '#333333',
              icon: 'success',
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true,
              title: 'Charla completada',
            });
            this.recargarCharlas();
          });
      }
    });
  }
}
