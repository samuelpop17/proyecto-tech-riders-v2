import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/Usuario';
import { ServiceProvincias } from 'src/app/services/service.provincias';
import { ServiceEmpresasCentros } from 'src/app/services/service.empresascentros';
import { ServiceUsuarios } from 'src/app/services/service.usuarios';

@Component({
  selector: 'app-listadosempresa',
  templateUrl: './listadosempresa.component.html',
  styleUrls: ['./listadosempresa.component.css'],
})
export class ListadosempresaComponent implements OnInit {
  public empresas!: any[];
  public empresasReset: any[] = [];
  public proFiltro!: any[];
  public empresasFiltroNombre!: any[]; //meter desde consulta
  public provincias!: any[];
  @ViewChild('selectprovincia') selectprovincia!: ElementRef;
  @ViewChild('selectempresa') selectempresa!: ElementRef;
  public empresa!: any;
  public provincia!: any;
  public filter_array!: any;
  public role!: number | null;
  public empresasCargadas: boolean = false;

  constructor(
    private _serviceProvincias: ServiceProvincias,
    private _serviceEmpresasCentros: ServiceEmpresasCentros,
    private _serviceUsuarios: ServiceUsuarios
  ) {}

  ngOnInit(): void {
    this.role = parseInt(localStorage.getItem('role') ?? '0');
    this._serviceProvincias.getProvincias().subscribe((response: any) => {
      this.provincias = response;
      this._serviceEmpresasCentros
        .getEmpresasCentrosActivas()
        .subscribe((response: any) => {
          this.empresas = response;

          this.empresas.forEach((centro) => {
            centro.provincia =
              this.provincias[centro.idProvincia - 1].nombreProvincia;
            if (centro.idTipoEmpresa == 1) this.empresasReset.push(centro);
          });

          this.proFiltro = this.empresasReset;
          this.empresasFiltroNombre = this.empresasReset;
          this.empresasFiltroNombre = this.empresasFiltroNombre.filter(
            (valor, indice, self) =>
              indice === self.findIndex((v) => v.nombre === valor.nombre)
          );

          this.empresasCargadas = true;
        });
    });
  }

  filtrarTabla() {
    this.empresasReset = this.proFiltro;
    let i = 0;
    this.empresa = this.selectempresa.nativeElement.selectedOptions[0].value;
    this.provincia = parseInt(
      this.selectprovincia.nativeElement.selectedOptions[0].value
    );
    this.filter_array = [];

    if (this.empresa == 'todo' && this.provincia == 0) {
      this.empresasReset = this.proFiltro;
      return;
    } else if (this.provincia == 0 && this.empresa != 'todo') {
      this.filter_array = this.empresasReset.filter(
        (x) => x.nombre === this.empresa
      );
    } else if (this.provincia != 0 && this.empresa == 'todo') {
      this.filter_array = this.empresasReset.filter(
        (x) => x.idProvincia === this.provincia
      );
    } else {
      this.filter_array = this.empresasReset.filter(
        (x) => x.nombre === this.empresa
      );
      this.filter_array = this.filter_array.filter(
        (x: { idProvincia: any }) => x.idProvincia === this.provincia
      );
    }
    this.empresasReset = this.filter_array;
  }

  getResponsables(idEmpresa: number): void {
    this._serviceUsuarios.getUsuarios().subscribe((response) => {
      let usuarios: Usuario[] = response;
      usuarios = usuarios.filter(
        (usuario) => usuario.idEmpresaCentro == idEmpresa && usuario.idRole == 4
      );
      let html = '';
      usuarios.forEach((usuario) => {
        html += `<div class='card mb-3'><div class='card-body'>
          <h5 class='card-title'>${usuario.nombre} ${usuario.apellidos}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope mb-1" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
            </svg>
            ${usuario.email}
          </h6>
          <h6 class="card-subtitle text-body-secondary text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin mb-1" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
            </svg>
            ${usuario.telefono}
          </h6>
          </div></div>`;
      });
      Swal.fire({
        color: '#333333',
        confirmButtonColor: '#212529',
        confirmButtonText: 'Cerrar',
        html: html,
        title: 'Responsables',
      });
    });
  }
}
