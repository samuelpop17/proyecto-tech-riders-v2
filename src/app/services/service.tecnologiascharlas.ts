import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class ServiceTecnologiasCharlas {
  constructor(private _http: HttpClient) {}

  createTecnologiaCharla(
    idCharla: number,
    idTecnologia: number
  ): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/TecnologiasCharlas';
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.post(url + request, null, {
      headers: header,
      params: {
        idcharla: idCharla,
        idtecnologia: idTecnologia,
      },
    });
  }

  getTecnologiasCharla(idCharla: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/TecnologiasCharlas/ByCharla/' + idCharla;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }
}
