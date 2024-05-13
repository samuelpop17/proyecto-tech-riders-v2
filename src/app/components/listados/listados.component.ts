import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiceQueryTools } from 'src/app/services/service.querytools';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css'],
})
export class ListadosComponent implements OnInit {
  public charlas!: any[];
  public charlasFiltro!: any[];
  public charlasFiltroTema!: any[]; //meter desde consulta
  public charlasFiltroTr!: any[]; //meter desde consulta
  @ViewChild('selectTr') selectTr!: ElementRef;
  @ViewChild('selectema') selectema!: ElementRef;
  public tema!: any;
  public tr!: any;
  public filter_array!: any;
  public role!: number | null;
  public charlasCargadas: boolean = false;

  constructor(private _serviceQueryTools: ServiceQueryTools) {}

  ngOnInit(): void {
    this.role = parseInt(localStorage.getItem('role') ?? '0');
    this._serviceQueryTools.getCharlasView().subscribe((response: any) => {
      this.charlas = response;
      this.charlasFiltro = response;
      this.charlasFiltroTema = response;
      this.charlasFiltroTr = response;
      this.charlasFiltroTema = this.charlasFiltroTema.filter(
        (valor, indice, self) =>
          indice ===
          self.findIndex((v) => v.descripcionCharla === valor.descripcionCharla)
      );
      this.charlasFiltroTr = this.charlasFiltroTr.filter(
        (valor, indice, self) =>
          indice === self.findIndex((v) => v.techRider === valor.techRider)
      );
      this.charlasCargadas = true;
    });
  }

  filtrarTabla() {
    this.charlas = this.charlasFiltro;
    let i = 0;
    this.tema = this.selectema.nativeElement.value;
    this.tr = this.selectTr.nativeElement.value;
    this.filter_array = [];

    if (this.tema == 'todo' && this.tr == 'todo') {
      this.charlas = this.charlasFiltro;
      return;
    } else if (this.tr == 'todo' && this.tema != 'todo') {
      this.filter_array = this.charlas.filter(
        (x) => x.descripcionCharla === this.tema
      );
    } else if (this.tr != 'todo' && this.tema == 'todo') {
      this.filter_array = this.charlas.filter((x) => x.techRider === this.tr);
    } else {
      this.filter_array = this.charlas.filter(
        (x) => x.descripcionCharla === this.tema
      );
      this.filter_array = this.filter_array.filter(
        (x: { techRider: any }) => x.techRider === this.tr
      );
    }
    this.charlas = this.filter_array;
  }

  getValoracion(valoracion: number, comentario: string) {
    Swal.fire({
      color: '#333333',
      confirmButtonColor: '#212529',
      confirmButtonText: 'Cerrar',
      html: `
      <p><span style="--valoracion:${valoracion / 2}"></span></p>
      <p>${comentario}</p>`,
      title: 'Valoración: ' + valoracion + '/10',
    });
  }
}
