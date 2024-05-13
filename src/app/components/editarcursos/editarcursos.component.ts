import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/models/Curso';
import { ServiceCursos } from 'src/app/services/service.cursos';
import { ServiceCursosProfesores } from 'src/app/services/service.cursosprofesores';
import { ServiceQueryTools } from 'src/app/services/service.querytools';

@Component({
  selector: 'app-editarcursos',
  templateUrl: './editarcursos.component.html',
  styleUrls: ['./editarcursos.component.css'],
})
export class EditarcursosComponent implements OnInit {
  public cursos!: Curso[];
  public allCursos!: Curso[];
  private id!: number;
  public role!: number;

  constructor(
    private _serviceQueryTools: ServiceQueryTools,
    private _serviceCursos: ServiceCursos,
    private _serviceCursosProfesor: ServiceCursosProfesores,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) this._router.navigate(['/login']);

    this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 2) {
      this.id = parseInt(localStorage.getItem('idUsuario') ?? '0');
      this._serviceQueryTools
        .findCursosProfesor(this.id)
        .subscribe((response) => {
          this.cursos = response;
          let centro!: any;
          this._serviceQueryTools
            .findEmpresaCentroUsuario(this.id)
            .subscribe((response) => {
              centro = response[0];
              this._serviceCursos.getCursos().subscribe((response) => {
                this.allCursos = response;
                let idsCursos = this.cursos.map((curso) => curso.idCurso);
                this.allCursos = this.allCursos.filter(
                  (curso) =>
                    !idsCursos.includes(curso.idCurso) &&
                    curso.idCentro == centro.idEmpresa
                );
              });
            });
        });
    } else this._router.navigate(['/usuario/perfil']);
  }

  eliminarCurso(idCurso: number): void {
    this._serviceCursosProfesor
      .deleteCursoProfesor(idCurso, this.id)
      .subscribe((response) => {
        this._router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this._router.navigate(['/usuario/editar-cursos']);
          });
      });
  }

  anyadirCurso(idCurso: number): void {
    this._serviceCursosProfesor
      .insertCursoProfesor(idCurso, this.id)
      .subscribe((response) => {
        this._router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this._router.navigate(['/usuario/editar-cursos']);
          });
      });
  }
}
