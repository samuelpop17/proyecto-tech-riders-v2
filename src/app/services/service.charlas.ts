import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Charla } from '../models/Charla';

@Injectable()
export class ServiceCharlas {
  constructor(private _http: HttpClient) {}

  asignarseUnaCharlaTechRider(
    idtech: number,
    idcharla: number
  ): Observable<any> {
    let url = environment.urlApi;
    let request =
      'api/Charlas/AsociarTechriderCharla/' + idtech + '/' + idcharla;

    let header = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this._http.put(url + request, null, { headers: header });
  }

  updateEstadoCharla(
    idCharla: number,
    idEstadoCharla: number
  ): Observable<any> {
    let url = environment.urlApi;
    let request =
      'api/Charlas/UpdateEstadoCharla/' + idCharla + '/' + idEstadoCharla;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.put(url + request, null, { headers: header });
  }

  createCharla(charla: Charla): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Charlas';
    let json = JSON.stringify(charla);
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.post(url + request, json, { headers: header });
  }

  getCharlas(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Charlas';
    return this._http.get(url + request);
  }

  findCharla(idCharla: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Charlas/' + idCharla;
    return this._http.get(url + request);
  }

  updateCharla(charla: Charla): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Charlas';
    let json = JSON.stringify(charla);
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.put(url + request, json, { headers: header });
  }
}
