import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionCentroEmpresa } from 'src/app/models/PeticionCentroEmpresa';
import { ServiceEmpresasCentros } from 'src/app/services/service.empresascentros';
import { ServicePeticionesCentroEmpresa } from 'src/app/services/service.peticionescentroempresa';
import { ServiceQueryTools } from 'src/app/services/service.querytools';

@Component({
  selector: 'app-altaempresa',
  templateUrl: './altaempresa.component.html',
  styleUrls: ['./altaempresa.component.css'],
})
export class AltaempresaComponent implements OnInit {
  public altaEmpresa: any[] = [];
  public peticionesAltaEmpresa!: PeticionCentroEmpresa[];
  public role!: number | null;
  public peticionesCargadas: boolean = false;

  constructor(
    private _serviceQueryTools: ServiceQueryTools,
    private _servicePeticionesCentroEmpresa: ServicePeticionesCentroEmpresa,
    private _serviceEmpresasCentros: ServiceEmpresasCentros,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) this._router.navigate(['/login']);

    this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 1) this.cargarDatos();
    else this._router.navigate(['/usuario/perfil']);
  }

  cargarDatos() {
    this.peticionesCargadas = false;
    this.altaEmpresa = [];
    this._servicePeticionesCentroEmpresa
      .getPeticionesCentroEmpresa()
      .subscribe((response) => {
        this.peticionesAltaEmpresa = response;
        this._serviceEmpresasCentros
          .getEmpresasCentros()
          .subscribe((response) => {
            for (let i = 0; i < response.length; i++) {
              for (let j = 0; j < this.peticionesAltaEmpresa.length; j++) {
                if (
                  this.peticionesAltaEmpresa[j].idCentroEmpresa ==
                  response[i].idEmpresaCentro
                ) {
                  this.altaEmpresa.push({
                    idPeticionCentroEmpresa:
                      this.peticionesAltaEmpresa[j].idPeticionCentroEmpresa,
                    idCentroEmpresa:
                      this.peticionesAltaEmpresa[j].idCentroEmpresa,
                    nombre: response[i].nombre,
                    cif: response[i].cif,
                    direccion: response[i].direccion,
                    personaContacto: response[i].personaContacto,
                    telefono: response[i].telefono,
                  });
                  break;
                }
              }
            }
            this.peticionesCargadas = true;
          });
      });
  }

  cambiarEstadoEmpresa(idEmpresa: number, idPeticion: number) {
    this._serviceEmpresasCentros
      .cambiarEstadoEmpresaCentro(idEmpresa)
      .subscribe((response) => {
        this._servicePeticionesCentroEmpresa
          .deletePeticionEmpresa(idPeticion)
          .subscribe((response) => {
            this._serviceQueryTools.actualizacionPeticiones();
            this.cargarDatos();
          });
      });
  }

  eliminarPeticionEmpresa(idPeticion: number) {
    this._servicePeticionesCentroEmpresa
      .anularEmpresa(idPeticion)
      .subscribe((response) => {
        this._serviceQueryTools.actualizacionPeticiones();
        this.cargarDatos();
      });
  }
}
