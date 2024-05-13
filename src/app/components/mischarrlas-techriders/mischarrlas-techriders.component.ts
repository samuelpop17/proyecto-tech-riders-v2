import { Component, OnInit } from '@angular/core';
import { DetallesEstadoCharlaTech } from 'src/app/models/DetallesEstadoCharlaTechRiders';
import { Router } from '@angular/router';
import { TechRider } from 'src/app/models/techRider';
import Swal from 'sweetalert2';
import { ServiceQueryTools } from 'src/app/services/service.querytools';
import { ServiceCharlas } from 'src/app/services/service.charlas';
import { ServiceUsuarios } from 'src/app/services/service.usuarios';
import { ServiceSolicitudAcreditacionesCharlas } from 'src/app/services/service.solicitudacreditacionescharlas';
import { ServiceEmail } from 'src/app/services/service.email';
import { environment } from 'src/environments/environment.development';
import { Charla } from 'src/app/models/Charla';

@Component({
  selector: 'app-mischarrlas-techriders',
  templateUrl: './mischarrlas-techriders.component.html',
  styleUrls: ['./mischarrlas-techriders.component.css'],
})
export class MischarrlasTechridersComponent implements OnInit {
  public charlasCargadas: boolean = false;
  public role!: number | null;
  public charlas: DetallesEstadoCharlaTech[] = [];

  constructor(
    private _serviceQueryTools: ServiceQueryTools,
    private _serviceCharlas: ServiceCharlas,
    private _serviceUsuarios: ServiceUsuarios,
    private _serviceAcreditacionesCharlas: ServiceSolicitudAcreditacionesCharlas,
    private _serviceEmail: ServiceEmail,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) this._router.navigate(['/login']);

    this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 3 || this.role == 4) {
      this._serviceQueryTools
        .estadoCharlasTechRiders()
        .subscribe((response) => {
          this.charlas = response;
          this.charlasCargadas = true;
        });
    } else this._router.navigate(['/usuario/perfil']);
  }

  anularCharla(idCharla: number) {
    this._serviceCharlas
      .asignarseUnaCharlaTechRider(0, idCharla)
      .subscribe((response) => {
        this._router
          .navigate(['/usuario/perfil'], { skipLocationChange: true })
          .then(() => {
            this._serviceQueryTools.actualizacionCharlas();
            this._serviceCharlas.findCharla(idCharla).subscribe((response) => {
              let idcurso: number = response.idCurso;
              this._serviceQueryTools.getCursosProfesorAll().subscribe((response) => {
                let cursosProfesores: any[] = response;
                let correos: string[] = [];
                cursosProfesores.forEach(element => {
                  if (element.idCurso == idcurso)
                    correos.push(element.emailProfesor);
                });
                correos.push(environment.emailAdmin);
                let asunto: string = "INFO CHARLA TECH RIDERS";
                let mensaje: string = "desasociar charla";
                this._serviceEmail.enviarMail(correos, asunto, mensaje).subscribe(() => {
                  this._router.navigate(['/mischarlastech']);
                });
              });
            });
          });
      });
  }

  acreditarCharla(idCharla: number) {
    this._serviceAcreditacionesCharlas
      .createSolicitudAcreditacionCharla(idCharla)
      .subscribe((response) => {
        this._serviceQueryTools.actualizacionPeticiones();
        this._router
          .navigate(['/usuario/perfil'], { skipLocationChange: true })
          .then(() => {
            this._router.navigate(['/mischarlastech']);
          });
      });
  }

  reasignarCharla(idCharla: number) {
    this._serviceUsuarios.getPerfilUsuario().subscribe((response) => {
      this._serviceQueryTools
        .getMisTechRidersResponsable(response.idEmpresaCentro)
        .subscribe(async (response) => {
          let usuarios: TechRider[] = response;
          let opciones: any = [];
          usuarios.forEach((usuario) => {
            opciones[usuario.idTechRider] = usuario.techRider;
          });
          const { value: techRider } = await Swal.fire({
            cancelButtonColor: '#212529',
            cancelButtonText: 'Cancelar',
            color: '#333333',
            confirmButtonColor: '#212529',
            confirmButtonText: 'Asignar',
            input: 'select',
            title: 'Reasignar charla',
            html: `<p class='text-muted text-center'>Asigna esta charla a un TechRider de tu empresa</p>`,
            inputOptions: opciones,
            showCancelButton: true,
            inputValidator: (value) => {
              return new Promise((resolve) => {
                resolve();
              });
            },
          });
          if (techRider) {
            this._serviceCharlas
              .asignarseUnaCharlaTechRider(techRider, idCharla)
              .subscribe((response) => {
                this._router
                  .navigate(['/usuario/perfil'], { skipLocationChange: true })
                  .then(() => {
                    this._router.navigate(['/charlas-empleados-empresa']);
                  });
              });
          }
        });
    });
  }
}
