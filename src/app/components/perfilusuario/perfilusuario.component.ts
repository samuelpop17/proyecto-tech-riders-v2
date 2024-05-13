import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { Router } from '@angular/router';
import { Provincia } from 'src/app/models/Provincia';
import { EmpresaCentro } from 'src/app/models/EmpresaCentro';
import { Role } from 'src/app/models/Role';
import { ServiceUsuarios } from 'src/app/services/service.usuarios';
import { ServiceProvincias } from 'src/app/services/service.provincias';
import { ServiceEmpresasCentros } from 'src/app/services/service.empresascentros';
import { ServiceRoles } from 'src/app/services/service.roles';
import { ServiceQueryTools } from 'src/app/services/service.querytools';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.component.html',
  styleUrls: ['./perfilusuario.component.css'],
})
export class PerfilusuarioComponent implements OnInit {
  public usuario!: Usuario;
  public provincia!: Provincia;
  public empresaCentro!: EmpresaCentro;
  public role!: Role;
  public tecnologias!: any[];
  public cursos!: any[];
  public empresaExists: boolean = false;
  public empresaLoaded: boolean = false;

  constructor(
    private _serviceUsuarios: ServiceUsuarios,
    private _serviceProvincias: ServiceProvincias,
    private _serviceEmpresasCentros: ServiceEmpresasCentros,
    private _serviceRoles: ServiceRoles,
    private _serviceQueryTools: ServiceQueryTools,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) this._router.navigate(['/login']);
    else {
      this._serviceUsuarios.getPerfilUsuario().subscribe((response) => {
        this.usuario = response;
        this._serviceProvincias
          .findProvincia(this.usuario.idProvincia)
          .subscribe((response) => {
            this.provincia = response;
          });
        if (this.usuario.idEmpresaCentro) {
          this.empresaExists = true;
          this._serviceEmpresasCentros
            .findEmpresaCentro(this.usuario.idEmpresaCentro)
            .subscribe((response) => {
              this.empresaLoaded = true;
              this.empresaCentro = response;
            });
        }
        this._serviceRoles
          .findRole(this.usuario.idRole)
          .subscribe((response) => {
            this.role = response;
          });

        if (this.usuario.idRole >= 3) {
          // TechRider o responsable
          this._serviceQueryTools
            .findTecnologiasTechRider(this.usuario.idUsuario)
            .subscribe((response) => {
              this.tecnologias = response;
            });
        }

        if (this.usuario.idRole == 2) {
          // Profesor
          this._serviceQueryTools
            .findCursosProfesor(this.usuario.idUsuario)
            .subscribe((response) => {
              this.cursos = response;
            });
        }
      });
    }
  }
}
