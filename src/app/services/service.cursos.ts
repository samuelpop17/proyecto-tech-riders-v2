import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Curso } from '../models/Curso';

@Injectable()
export class ServiceCursos {
  constructor(private _http: HttpClient) {}

  getCursos(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Cursos';
    return this._http.get(url + request);
  }

  createCurso(curso: Curso): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Cursos';
    let json = JSON.stringify(curso);
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.post(url + request, json, { headers: header });
  }
}
