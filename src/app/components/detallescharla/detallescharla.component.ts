import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TecnologiaCharla } from 'src/app/models/TecnologiaCharla';
import { ServiceQueryTools } from 'src/app/services/service.querytools';
import { ServiceTecnologias } from 'src/app/services/service.tecnologias';
import { ServiceTecnologiasCharlas } from 'src/app/services/service.tecnologiascharlas';

@Component({
  selector: 'app-detallescharla',
  templateUrl: './detallescharla.component.html',
  styleUrls: ['./detallescharla.component.css'],
})
export class DetallescharlaComponent implements OnInit {
  public charla!: any;
  public tecnologias: string[] = [];
  public tecnologiasCargadas: boolean = false;

  constructor(
    private _serviceQueryTools: ServiceQueryTools,
    private _serviceTecnologiasCharlas: ServiceTecnologiasCharlas,
    private _serviceTecnologias: ServiceTecnologias,
    private _activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activeRoute.params.subscribe((params: Params) => {
      if (params['idcharla']) {
        let idcharla = parseInt(params['idcharla']);
        this._serviceQueryTools
          .findCharlaView(idcharla)
          .subscribe((response) => {
            this.charla = response;
          });
        this._serviceTecnologiasCharlas
          .getTecnologiasCharla(idcharla)
          .subscribe((response: TecnologiaCharla[]) => {
            if (response.length > 0) {
              response.forEach((tecnologia: TecnologiaCharla) => {
                this._serviceTecnologias
                  .findTecnologia(tecnologia.idTecnologia)
                  .subscribe((response) => {
                    this.tecnologias.push(response.nombreTecnologia);
                    this.tecnologiasCargadas = true;
                  });
              });
            } else this.tecnologiasCargadas = true;
          });
      }
    });
  }
}
