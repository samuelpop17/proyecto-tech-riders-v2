import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudAcreditacionCharla } from 'src/app/models/SolicitudAcreditacionCharla';
import { ServiceCharlas } from 'src/app/services/service.charlas';
import { ServiceSolicitudAcreditacionesCharlas } from 'src/app/services/service.solicitudacreditacionescharlas';
import { ServiceQueryTools } from 'src/app/services/service.querytools';

@Component({
  selector: 'app-acreditarcharla',
  templateUrl: './acreditarcharla.component.html',
  styleUrls: ['./acreditarcharla.component.css'],
})
export class AcreditarcharlaComponent implements OnInit {
  public peticionesCharlas!: SolicitudAcreditacionCharla[];
  public charlas: any[] = [];
  public role!: number | null;
  public acreditacionesCargadas: boolean = false;

  ngOnInit(): void {
    if (!localStorage.getItem('token')) this._router.navigate(['/login']);

    this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 1) this.cargarDatos();
    else this._router.navigate(['/usuario/perfil']);
  }

  constructor(
    private _serviceCharlas: ServiceCharlas,
    private _serviceAcreditacionesCharlas: ServiceSolicitudAcreditacionesCharlas,
    private _serviceQueryTools: ServiceQueryTools,
    private _router: Router
  ) {}

  cambiarEstado(idCharla: number, idPeticion: number) {
    this._serviceCharlas
      .updateEstadoCharla(idCharla, 6)
      .subscribe((response) => {
        this.eliminarAcreditacion(idPeticion);
      });
  }

  eliminarAcreditacion(idPeticion: number) {
    this._serviceAcreditacionesCharlas
      .solicitudAcreditacionEliminar(idPeticion)
      .subscribe((response) => {
        this._serviceQueryTools.actualizacionPeticiones();
        this.cargarDatos();
      });
  }

  cargarDatos() {
    this.acreditacionesCargadas = false;
    this.charlas = [];
    this._serviceAcreditacionesCharlas
      .getAcreditacionesCharlas()
      .subscribe((response) => {
        this.peticionesCharlas = response;
        this._serviceCharlas.getCharlas().subscribe((response) => {
          for (let i = 0; i < response.length; i++) {
            for (let j = 0; j < this.peticionesCharlas.length; j++) {
              if (this.peticionesCharlas[j].idCharla == response[i].idCharla) {
                this.charlas.push({
                  idCharla: response[i].idCharla,
                  descripcion: response[i].descripcion,
                  fechaCharla: response[i].fechaCharla,
                  fechaSolicitud: response[i].fechaSolicitud,
                  idPeticion: this.peticionesCharlas[j].idPeticionCharla,
                });
                break;
              }
            }
          }
          this.acreditacionesCargadas = true;
        });
      });
  }
}
