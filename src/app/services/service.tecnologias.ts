import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class ServiceTecnologias {
  constructor(private _http: HttpClient) {}

  getTecnologias(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Tecnologias';
    return this._http.get(url + request);
  }

  findTecnologia(idTecnologia: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Tecnologias/' + idTecnologia;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  insertTecnologia(nombre: string): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/tecnologias';
    let json = JSON.stringify({
      idTecnologia: 0,
      nombreTecnologia: nombre,
      idTipoTecnologia: 1,
    });
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.post(url + request, json, { headers: header });
  }
}
