import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Curso } from 'src/app/models/Curso';
import { ServiceCursos } from 'src/app/services/service.cursos';
import { ServiceEmpresasCentros } from 'src/app/services/service.empresascentros';

@Component({
  selector: 'app-cursos-centro',
  templateUrl: './cursos-centro.component.html',
  styleUrls: ['./cursos-centro.component.css'],
})
export class CursosCentroComponent implements OnInit {
  public cursos!: Curso[];
  public cursosCargados: boolean = false;
  public role!: number | null;
  public idCentro!: number;
  public nombreCentro!: string;

  @ViewChild('controlnombre') controlNombre!: ElementRef;
  @ViewChild('controldescripcion') controlDescripcion!: ElementRef;

  constructor(
    private _serviceEmpresasCentros: ServiceEmpresasCentros,
    private _serviceCursos: ServiceCursos,
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.role = parseInt(localStorage.getItem('role') ?? '0');
    this._activeRoute.params.subscribe((params: Params) => {
      if (params['idcentro']) {
        this.idCentro = parseInt(params['idcentro']);
        this._serviceEmpresasCentros
          .findEmpresaCentro(this.idCentro)
          .subscribe((response) => {
            this.nombreCentro = response.nombre;
            this._serviceCursos.getCursos().subscribe((response) => {
              this.cursos = response;
              this.cursos = this.cursos.filter(
                (curso) => curso.idCentro == this.idCentro
              );
              this.cursosCargados = true;
            });
          });
      }
    });
  }

  createCurso(): void {
    let curso: Curso = {
      idCurso: 0,
      idCentro: this.idCentro,
      nombreCurso: this.controlNombre.nativeElement.value,
      descripcion: this.controlDescripcion.nativeElement.value,
    };
    this._serviceCursos.createCurso(curso).subscribe((response) => {
      this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this._router.navigate(['/cursos-centro', this.idCentro]);
      });
    });
  }
}
