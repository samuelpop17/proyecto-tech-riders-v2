import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class ServiceCursosProfesores {
  constructor(private _http: HttpClient) {}

  deleteCursoProfesor(idCurso: number, idProfesor: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/CursosProfesores';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.delete(url + request, {
      headers: header,
      params: {
        idcurso: idCurso,
        idprofesor: idProfesor,
      },
    });
  }

  insertCursoProfesor(idCurso: number, idProfesor: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/CursosProfesores';
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.post(url + request, null, {
      headers: header,
      params: {
        idcurso: idCurso,
        idprofesor: idProfesor,
      },
    });
  }
}
