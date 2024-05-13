import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class ServiceTecnologiasTechRiders {
  constructor(private _http: HttpClient) {}

  insertTecnologiaTechRider(
    idUsuario: number,
    idTecnologia: number
  ): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/TecnologiasTechRiders';
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.post(url + request, null, {
      headers: header,
      params: {
        idtechrider: idUsuario,
        idtecnologia: idTecnologia,
      },
    });
  }

  deleteTecnologiaTechRider(
    idUsuario: number,
    idTecnologia: number
  ): Observable<any> {
    let url = environment.urlApi;
    let request =
      'api/TecnologiasTechRiders/Delete/' + idUsuario + '/' + idTecnologia;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.delete(url + request, { headers: header });
  }
}
