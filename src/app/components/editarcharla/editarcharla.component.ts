import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Charla } from 'src/app/models/Charla';
import { EstadoCharla } from 'src/app/models/EstadoCharla';
import { TecnologiaCharla } from 'src/app/models/TecnologiaCharla';
import { Usuario } from 'src/app/models/Usuario';
import { ServiceCharlas } from 'src/app/services/service.charlas';
import { ServiceEmail } from 'src/app/services/service.email';
import { ServiceEstadosCharlas } from 'src/app/services/service.estadoscharlas';
import { ServiceQueryTools } from 'src/app/services/service.querytools';
import { ServiceTecnologiasCharlas } from 'src/app/services/service.tecnologiascharlas';
import { ServiceUsuarios } from 'src/app/services/service.usuarios';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editarcharla',
  templateUrl: './editarcharla.component.html',
  styleUrls: ['./editarcharla.component.css'],
})
export class EditarcharlaComponent implements OnInit {
  public charla!: Charla;
  public role!: number;
  public usuarios!: Usuario[];
  public allUsuarios!: Usuario[];
  public estados!: EstadoCharla[];
  public camposAdminCargados: boolean = false;
  public techRidersCargados: boolean = true;

  @ViewChild('controldescripcion') controlDescripcion!: ElementRef;
  @ViewChild('controlfecha') controlFecha!: ElementRef;
  @ViewChild('selectturno') selectTurno!: ElementRef;
  @ViewChild('selectmodalidad') selectModalidad!: ElementRef;
  @ViewChild('controlobservaciones') controlObservaciones!: ElementRef;
  @ViewChild('controlTechRider') controlTechRider!: ElementRef;
  @ViewChild('controlEstado') controlEstado!: ElementRef;

  constructor(
    private _serviceCharlas: ServiceCharlas,
    private _serviceUsuarios: ServiceUsuarios,
    private _serviceEstadosCharlas: ServiceEstadosCharlas,
    private _serviceTecnologiasCharlas: ServiceTecnologiasCharlas,
    private _serviceQueryTools: ServiceQueryTools,
    private _serviceEmail: ServiceEmail,
    private _router: Router,
    private _activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) this._router.navigate(['/login']);

    this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 1 || this.role == 2) {
      this._activeRoute.params.subscribe((params: Params) => {
        if (params['idcharla']) {
          let idcharla = parseInt(params['idcharla']);
          this._serviceCharlas.findCharla(idcharla).subscribe((response) => {
            this.charla = response;
          });
          if (this.role == 1) {
            this._serviceUsuarios.getUsuarios().subscribe((response) => {
              this.allUsuarios = response;
              this.allUsuarios = this.allUsuarios.filter(
                (usuario) => usuario.idRole == 3
              );
              this.usuarios = this.allUsuarios;
              this._serviceEstadosCharlas
                .getEstadosCharlas()
                .subscribe((response) => {
                  this.estados = response;
                  this.camposAdminCargados = true;
                });
            });
          }
        }
      });
    } else this._router.navigate(['/usuario/perfil']);
  }

  editarCharla() {
    let fechaCharla = null;
    if (this.controlFecha.nativeElement.value != '')
      fechaCharla = this.controlFecha.nativeElement.value;
    let modalidad = this.selectModalidad.nativeElement.value;
    if (modalidad == 'SIN DEFINIR') modalidad = null;
    let charla: Charla = {
      idCharla: this.charla.idCharla,
      descripcion: this.controlDescripcion.nativeElement.value,
      idEstadoCharla: this.charla.idEstadoCharla,
      fechaCharla: fechaCharla,
      observaciones: this.controlObservaciones.nativeElement.value,
      idTechRider: this.charla.idTechRider,
      fechaSolicitud: this.charla.fechaSolicitud,
      turno: this.selectTurno.nativeElement.selectedOptions[0].value,
      modalidad: modalidad,
      acreditacionLinkedIn: this.charla.acreditacionLinkedIn,
      idCurso: this.charla.idCurso,
      idProvincia: this.charla.idProvincia,
    };
    this._serviceCharlas.getCharlas().subscribe((response) => {
      let charlas = response;
      let fecha = new Date(charla.fechaCharla);
      charlas = charlas.filter((chrl: Charla) => {
        let otraFecha = new Date(chrl.fechaCharla);
        if (otraFecha.getMonth() >= 0 && otraFecha.getMonth() <= 7) {
          var principio = new Date(otraFecha.getFullYear() - 1, 8, 1);
          var final = new Date(otraFecha.getFullYear(), 7, 31);
        } else {
          var principio = new Date(otraFecha.getFullYear(), 8, 1);
          var final = new Date(otraFecha.getFullYear() + 1, 7, 31);
        }
        return (
          chrl.idCurso == charla.idCurso &&
          chrl.idCharla != charla.idCharla &&
          fecha >= principio &&
          fecha <= final
        );
      });
      if (charlas.length == 0) {
        this._serviceCharlas.updateCharla(charla).subscribe((response) => {
          this._router.navigate(['/charlas/mis-charlas']);
        });
      } else {
        Swal.fire({
          color: '#333333',
          confirmButtonColor: '#212529',
          confirmButtonText: 'Cerrar',
          icon: 'error',
          text: 'Existe ya una charla para este curso solicitada en el curso escolar marcado',
          title: 'Error',
        });
      }
    });
  }

  changeTechRidersAdmin(event: any) {
    if (event.target.checked) {
      this.techRidersCargados = false;
      this._serviceTecnologiasCharlas
        .getTecnologiasCharla(this.charla.idCharla)
        .subscribe((charlaResponse: TecnologiaCharla[]) => {
          // Cogemos solo los IDs de las tecnologías de la charla
          let tecnologiasCharla: number[] = charlaResponse.map(
            (tecnologiaCharla: TecnologiaCharla) =>
              tecnologiaCharla.idTecnologia
          );

          // Creamos un array de observables para esperar a recoger todas las tecnologías de todos los TRs
          const tecnologiasTechRiders: Observable<any>[] = this.allUsuarios.map(
            (usuario: Usuario) =>
              this._serviceQueryTools.getTecnologiasTechRider(usuario.idUsuario)
          );

          // forkJoin para esperar a que todos los observables se completen -> recoger todas las tecnologías de todos los TRs
          forkJoin(tecnologiasTechRiders).subscribe(
            (tecnologiasTR: any[][]) => {
              this.usuarios = this.allUsuarios.filter((usuario, index) => {
                // Recogemos todas las tecnologías de un TechRider
                const tecnologiasTechRider: number[] = tecnologiasTR[index].map(
                  (tecnologiaTR: any) => tecnologiaTR.idTecnologia
                );

                // Si alguna tecnología del TR coincide con alguna de la charla, aparecerá el TR en el select
                return tecnologiasTechRider.some((idTecnologia) =>
                  tecnologiasCharla.includes(idTecnologia)
                );
              });
              this.techRidersCargados = true;
            }
          );
        });
    } else {
      this.usuarios = this.allUsuarios;
    }
  }

  editarCharlaAdmin() {
    let fechaCharla = null;
    if (this.controlFecha.nativeElement.value != '')
      fechaCharla = this.controlFecha.nativeElement.value;
    let modalidad = this.selectModalidad.nativeElement.value;
    if (modalidad == 'SIN DEFINIR') modalidad = null;
    let charla: Charla = {
      idCharla: this.charla.idCharla,
      descripcion: this.controlDescripcion.nativeElement.value,
      idEstadoCharla: this.controlEstado.nativeElement.selectedOptions[0].value,
      fechaCharla: fechaCharla,
      observaciones: this.controlObservaciones.nativeElement.value,
      idTechRider: this.controlTechRider.nativeElement.selectedOptions[0].value,
      fechaSolicitud: this.charla.fechaSolicitud,
      turno: this.selectTurno.nativeElement.selectedOptions[0].value,
      modalidad: modalidad,
      acreditacionLinkedIn: this.charla.acreditacionLinkedIn,
      idCurso: this.charla.idCurso,
      idProvincia: this.charla.idProvincia,
    };
    this._serviceCharlas.updateCharla(charla).subscribe((response) => {
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
                this._router.navigate(['/listados']);
              });
            });
          });
        }
      });
    });
  }
}
