import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceQueryTools } from 'src/app/services/service.querytools';
import { ServiceTecnologias } from 'src/app/services/service.tecnologias';
import { ServiceTecnologiasTechRiders } from 'src/app/services/service.tecnologiastechriders';

@Component({
  selector: 'app-editartecnologiastechrider',
  templateUrl: './editartecnologiastechrider.component.html',
  styleUrls: ['./editartecnologiastechrider.component.css'],
})
export class EditartecnologiastechriderComponent implements OnInit {
  public tecnologias!: any[];
  public allTecnologias!: any[];
  private id!: number;
  public role!: number | null;

  constructor(
    private _serviceQueryTools: ServiceQueryTools,
    private _serviceTecnologias: ServiceTecnologias,
    private _serviceTecnologiasTechRiders: ServiceTecnologiasTechRiders,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) this._router.navigate(['/login']);

    this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 3 || this.role == 4) {
      this.id = parseInt(localStorage.getItem('idUsuario') ?? '0');
      this._serviceQueryTools
        .findTecnologiasTechRider(this.id)
        .subscribe((response) => {
          this.tecnologias = response;
          this._serviceTecnologias.getTecnologias().subscribe((response) => {
            this.allTecnologias = response;
            let idsTecnologias = this.tecnologias.map(
              (tecnologia) => tecnologia.idTecnologia
            );
            this.allTecnologias = this.allTecnologias.filter(
              (tecnologia) => !idsTecnologias.includes(tecnologia.idTecnologia)
            );
          });
        });
    } else this._router.navigate(['/usuario/perfil']);
  }

  eliminarTecnologia(idTecnologia: number): void {
    this._serviceTecnologiasTechRiders
      .deleteTecnologiaTechRider(this.id, idTecnologia)
      .subscribe((response) => {
        this._serviceQueryTools.actualizacionCharlas();
        this._router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this._router.navigate(['/usuario/editar-tecnologias']);
          });
      });
  }

  anyadirTecnologia(idTecnologia: number): void {
    this._serviceTecnologiasTechRiders
      .insertTecnologiaTechRider(this.id, idTecnologia)
      .subscribe((response) => {
        this._serviceQueryTools.actualizacionCharlas();
        this._router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this._router.navigate(['/usuario/editar-tecnologias']);
          });
      });
  }
}
