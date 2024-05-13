import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionAltaUser } from 'src/app/models/PeticionAltaUser';
import { ServicePeticionesAltaUsers } from 'src/app/services/service.peticionesaltausers';
import { ServiceQueryTools } from 'src/app/services/service.querytools';
import { ServiceUsuarios } from 'src/app/services/service.usuarios';
@Component({
  selector: 'app-altausuario',
  templateUrl: './altausuario.component.html',
  styleUrls: ['./altausuario.component.css'],
})
export class AltausuarioComponent implements OnInit {
  public altaUsuarios: any[] = [];
  public peticionesAltaUsuarios!: PeticionAltaUser[];
  public role!: number | null;
  public peticionesCargadas: boolean = false;

  constructor(
    private _servicePeticionesAltaUsers: ServicePeticionesAltaUsers,
    private _serviceUsuarios: ServiceUsuarios,
    private _serviceQueryTools: ServiceQueryTools,
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
    this.altaUsuarios = [];
    this._servicePeticionesAltaUsers
      .getPeticionesAltaUser()
      .subscribe((response) => {
        this.peticionesAltaUsuarios = response;
        this._serviceUsuarios.getUsuarios().subscribe((response) => {
          for (let i = 0; i < response.length; i++) {
            for (let j = 0; j < this.peticionesAltaUsuarios.length; j++) {
              if (
                this.peticionesAltaUsuarios[j].idUser == response[i].idUsuario
              ) {
                this.altaUsuarios.push({
                  idPeticionAltaUsers:
                    this.peticionesAltaUsuarios[j].idPeticionAltaUsers,
                  idUser: this.peticionesAltaUsuarios[j].idUser,
                  nombre: response[i].nombre,
                  apellidos: response[i].apellidos,
                  email: response[i].email,
                  role: response[i].idRole,
                });
                break;
              }
            }
            this.peticionesCargadas = true;
          }
        });
      });
  }

  cambiarEstadoUsuario(idUsuario: number, idPeticion: number) {
    this._serviceUsuarios
      .cambiarEstadoUsuario(idUsuario)
      .subscribe((response) => {
        this._servicePeticionesAltaUsers
          .eliminarPeticionUsuario(idPeticion)
          .subscribe((response) => {
            this._serviceQueryTools.actualizacionPeticiones();
            this.cargarDatos();
          });
      });
  }

  eliminarPeticionUsuario(idUsuario: number, idPeticion: number) {
    this._servicePeticionesAltaUsers
      .eliminarPeticionUsuario(idPeticion)
      .subscribe((response) => {
        this._serviceUsuarios.deleteUsuario(idUsuario).subscribe((response) => {
          this._serviceQueryTools.actualizacionPeticiones();
          this.cargarDatos();
        });
      });
  }
}
