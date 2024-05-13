import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ValoracionCharla } from '../models/ValoracionCharla';

@Injectable()
export class ServiceValoracionesCharlas {
  constructor(private _http: HttpClient) {}

  findValoracionCharla(idCharla: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/ValoracionesCharlas/Valoraciones/' + idCharla;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  createValoracionCharla(valoracion: ValoracionCharla): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/ValoracionesCharlas';
    let json = JSON.stringify(valoracion);
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.post(url + request, json, { headers: header });
  }

  updateValoracionCharla(valoracion: ValoracionCharla): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/ValoracionesCharlas';
    let json = JSON.stringify(valoracion);
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.put(url + request, json, { headers: header });
  }
}
