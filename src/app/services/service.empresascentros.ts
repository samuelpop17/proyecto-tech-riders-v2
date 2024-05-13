import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { EmpresaCentro } from '../models/EmpresaCentro';

@Injectable()
export class ServiceEmpresasCentros {
  constructor(private _http: HttpClient) {}

  findEmpresaCentro(id: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/EmpresasCentros/' + id;
    return this._http.get(url + request);
  }

  editEmpresaUsuarioRepresentante(empresa: EmpresaCentro): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/EmpresasCentros';
    let json = JSON.stringify(empresa);
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this._http.put(url + request, json, { headers: header });
  }

  getEmpresasCentros(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/EmpresasCentros';
    return this._http.get(url + request);
  }

  createEmpresaCentro(empresaCentro: EmpresaCentro): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/EmpresasCentros';
    let json = JSON.stringify(empresaCentro);
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.post(url + request, json, { headers: header });
  }

  cambiarEstadoEmpresaCentro(idEmpresa: number): Observable<any> {
    let url = environment.urlApi;
    let request =
      'api/empresascentros/updateestadoempresacentro/' + idEmpresa + '/1';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.put(url + request, null, { headers: header });
  }

  getEmpresasCentrosActivas(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/EmpresasCentros/EmpresasCentrosEstado/1';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }
}
