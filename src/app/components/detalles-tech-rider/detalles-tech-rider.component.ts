import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ServiceQueryTools } from 'src/app/services/service.querytools';

@Component({
  selector: 'app-detalles-tech-rider',
  templateUrl: './detalles-tech-rider.component.html',
  styleUrls: ['./detalles-tech-rider.component.css'],
})
export class DetallesTechRiderComponent implements OnInit {
  public techrider!: any;
  public tecnologias!: any[];
  public role!: number | null;

  constructor(
    private _serviceQueryTools: ServiceQueryTools,
    private _activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activeRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.role = parseInt(localStorage.getItem('role') ?? '0');
        let idTechRider = params['id'];
        this._serviceQueryTools.getTechRiders().subscribe((response: any[]) => {
          this.techrider = response.filter((tr) => tr.id == idTechRider)[0];
          this._serviceQueryTools
            .findTecnologiasTechRider(this.techrider.idTechRider)
            .subscribe((response) => {
              this.tecnologias = response;
            });
        });
      }
    });
  }
}
