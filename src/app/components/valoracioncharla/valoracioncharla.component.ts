import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ValoracionCharla } from 'src/app/models/ValoracionCharla';
import { ServiceValoracionesCharlas } from 'src/app/services/service.valoracionescharlas';

@Component({
  selector: 'app-valoracioncharla',
  templateUrl: './valoracioncharla.component.html',
  styleUrls: ['./valoracioncharla.component.css'],
})
export class ValoracioncharlaComponent implements OnInit {
  public valoracion!: ValoracionCharla;
  public valoExiste: boolean = false;
  public role!: number | null;

  @ViewChild('controlvaloracion') controlValoracion!: ElementRef;
  @ViewChild('controlcomentario') controlComentario!: ElementRef;

  constructor(
    private _activeRoute: ActivatedRoute,
    private _serviceValoracionesCharlas: ServiceValoracionesCharlas,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) this._router.navigate(['/login']);

    this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 2) {
      this._activeRoute.params.subscribe((params: Params) => {
        if (params['idcharla']) {
          let idcharla = parseInt(params['idcharla']);
          this.valoracion = {
            idCharla: idcharla,
            idValoracion: 0,
            comentario: '',
            valoracion: 0,
          };
          this._serviceValoracionesCharlas
            .findValoracionCharla(idcharla)
            .subscribe((response) => {
              if (response[0] != undefined) this.valoracion = response[0];
              this.valoExiste = true;
            });
        }
      });
    } else this._router.navigate(['/usuario/perfil']);
  }

  editarValoracion(): void {
    this.valoracion.valoracion = this.controlValoracion.nativeElement.value;
    this.valoracion.comentario = this.controlComentario.nativeElement.value;
    if (this.valoracion.idValoracion == 0) {
      this._serviceValoracionesCharlas
        .createValoracionCharla(this.valoracion)
        .subscribe((response) => {
          this._router.navigate(['/charlas/mis-charlas']);
        });
    } else {
      this._serviceValoracionesCharlas
        .updateValoracionCharla(this.valoracion)
        .subscribe((response) => {
          this._router.navigate(['/charlas/mis-charlas']);
        });
    }
  }
}
