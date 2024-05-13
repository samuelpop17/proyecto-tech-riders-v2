import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServicePeticionesTecnologias } from 'src/app/services/service.peticionestecnologias';
import { ServiceQueryTools } from 'src/app/services/service.querytools';
import { ServiceTipoTecnologias } from 'src/app/services/service.tipotecnologias';

@Component({
  selector: 'app-proponer-tecnologia',
  templateUrl: './proponer-tecnologia.component.html',
  styleUrls: ['./proponer-tecnologia.component.css'],
})
export class ProponerTecnologiaComponent implements OnInit {
  public tiposCargados: boolean = false;
  public role!: number | null;

  constructor(
    private _router: Router,
    private _serviceTipoTecnologias: ServiceTipoTecnologias,
    private _servicePeticionesTecnologias: ServicePeticionesTecnologias,
    private _serviceQueryTools: ServiceQueryTools
  ) {}

  @ViewChild('controlnombre') controlNombre!: ElementRef;
  @ViewChild('selecttipo') selectTipo!: ElementRef;

  public tecnologias!: any[];

  ngOnInit(): void {
    if (!localStorage.getItem('token')) this._router.navigate(['/login']);

    this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 3 || this.role == 4) {
      this._serviceTipoTecnologias
        .getTipoTecnologias()
        .subscribe((response) => {
          this.tecnologias = response;
          this.tiposCargados = true;
        });
    } else this._router.navigate(['/usuario/perfil']);
  }
  enviarSolicitud(): void {
    this._servicePeticionesTecnologias
      .createPeticionTecnologia(this.controlNombre.nativeElement.value)
      .subscribe((response) => {
        this._serviceQueryTools.actualizacionPeticiones();
        this._router.navigate(['/usuario/editar-tecnologias']);
      });

    //al enviar la solicitud de nueva tecnologia es importante saber que el TiposPeticionesCategorias el rol es=4
  }
}
