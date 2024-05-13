import { ServiceUsuarios } from './../../services/service.usuarios';
import { Component, OnInit } from '@angular/core';
import { TechRider } from 'src/app/models/techRider';
import { DetallesCharlas } from 'src/app/models/DetallesCharlas';
import { Router } from '@angular/router';
import { ServiceQueryTools } from 'src/app/services/service.querytools';

@Component({
  selector: 'app-mistechriders-responsable',
  templateUrl: './mistechriders-responsable.component.html',
  styleUrls: ['./mistechriders-responsable.component.css'],
})
export class MistechridersResponsableComponent implements OnInit {
  public usuarios: TechRider[] = [];
  public charlas: DetallesCharlas[] = [];
  public charlasCargadas: boolean = false;
  public usuariosCargados: boolean = false;
  public role!: number | null;

  constructor(
    private _serviceUsuarios: ServiceUsuarios,
    private _serviceQueryTools: ServiceQueryTools,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) this._router.navigate(['/login']);

    this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 4) {
      this._serviceUsuarios.getPerfilUsuario().subscribe((response) => {
        this._serviceQueryTools
          .getMisTechRidersResponsable(response.idEmpresaCentro)
          .subscribe((response) => {
            this.usuariosCargados = true;
            this.usuarios = response;
          });

        this._serviceQueryTools
          .getCharlasTechResponsable(response.idEmpresaCentro)
          .subscribe((response) => {
            this.charlasCargadas = true;
            this.charlas = response;
          });
      });
    } else this._router.navigate(['/usuario/perfil']);
  }
}
