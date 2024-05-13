import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionTecnologia } from 'src/app/models/PeticionTecnologia';
import { ServicePeticionesTecnologias } from 'src/app/services/service.peticionestecnologias';
import { ServiceTecnologias } from 'src/app/services/service.tecnologias';
import { ServiceQueryTools } from 'src/app/services/service.querytools';

@Component({
  selector: 'app-aniadirtecnologia',
  templateUrl: './aniadirtecnologia.component.html',
  styleUrls: ['./aniadirtecnologia.component.css'],
})
export class AniadirtecnologiaComponent implements OnInit {
  public role!: number | null;
  public peticionesTecnologias!: PeticionTecnologia[];
  public tecnologiasCargadas: boolean = false;

  constructor(
    private _servicePeticionesTecnologias: ServicePeticionesTecnologias,
    private _serviceTecnologias: ServiceTecnologias,
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
    this.tecnologiasCargadas = false;
    this._servicePeticionesTecnologias
      .getPeticionesTecnologia()
      .subscribe((response) => {
        this.peticionesTecnologias = response;
        this.tecnologiasCargadas = true;
      });
  }

  insertTeconologia(nombre: string, idPeticionTecnologia: number) {
    this._serviceTecnologias.insertTecnologia(nombre).subscribe((response) => {
      this.eliminarPeticion(idPeticionTecnologia);
    });
  }
  eliminarPeticion(idPeticionTecnologia: number) {
    this._servicePeticionesTecnologias
      .deletePeticionTecnologia(idPeticionTecnologia)
      .subscribe((response) => {
        this._serviceQueryTools.actualizacionPeticiones();
        this.cargarDatos();
      });
  }
}
