import { Component, DoCheck } from '@angular/core';
import { ServiceEmpresasCentros } from 'src/app/services/service.empresascentros';
import { ServiceQueryTools } from 'src/app/services/service.querytools';
import { ServiceUsuarios } from 'src/app/services/service.usuarios';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements DoCheck {
  public role!: number | null;
  public token!: string | null;
  public estadoEmpresa: number = 0;
  public numPeticiones: number = 0;
  public numCharlas: number = 0;

  constructor(
    private _serviceQueryTools: ServiceQueryTools,
    private _serviceUsuarios: ServiceUsuarios,
    private _serviceEmpresasCentros: ServiceEmpresasCentros
  ) {}

  ngDoCheck(): void {
    // NO TOCAR CONDICIÓN (por favor)
    if (
      (parseInt(localStorage.getItem('role') ?? '0') != 0 &&
        (this.role != localStorage.getItem('role') ||
          this.token != localStorage.getItem('token'))) ||
      (this.role != 0 && parseInt(localStorage.getItem('role') ?? '0') == 0)
    ) {
      console.log('CUIDAO');
      this.role = parseInt(localStorage.getItem('role') ?? '0');
      this.token = localStorage.getItem('token');
      if (this.role == 3 || this.role == 4) {
        this._serviceQueryTools.actualizacionCharlas();
        this._serviceQueryTools.numCharlas$.subscribe((data) => {
          this.numCharlas = data;
        });
      }
      if (this.role == 4) {
        this._serviceUsuarios.getPerfilUsuario().subscribe((response) => {
          if (response.idEmpresaCentro) {
            this._serviceEmpresasCentros
              .findEmpresaCentro(response.idEmpresaCentro)
              .subscribe((response) => {
                this.estadoEmpresa = response.estadoEmpresa;
              });
          } else this.estadoEmpresa = 0;
        });
      } else if (this.role == 1) {
        this._serviceQueryTools.actualizacionPeticiones();
        this._serviceQueryTools.numPeticiones$.subscribe((data) => {
          this.numPeticiones = data;
        });
      }
    }
  }
}
