import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Usuario } from '../models/Usuario';

@Injectable()
export class ServiceUsuarios {
  constructor(private _http: HttpClient) {}

  getPerfilUsuario(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Usuarios/PerfilUsuario';
    let header = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this._http.get(url + request, { headers: header });
  }

  editUsuario(usuario: Usuario): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Usuarios';
    let json = JSON.stringify(usuario);
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this._http.put(url + request, json, { headers: header });
  }

  getUsuarios(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Usuarios';
    let header = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this._http.get(url + request, { headers: header });
  }

  updatePasswordUsuario(id: number, password: string): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Usuarios/UpdatePasswordUsuario';
    let json = JSON.stringify({
      idUser: id,
      password: password,
    });
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this._http.put(url + request, json, { headers: header });
  }

  createUsuario(usuario: Usuario): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Usuarios';
    let header = {
      'Content-Type': 'application/json',
    };
    let json = JSON.stringify(usuario);
    return this._http.post(url + request, json, { headers: header });
  }

  cambiarEstadoUsuario(idUsuario: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/usuarios/updateestadousuario/' + idUsuario + '/1';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.put(url + request, null, { headers: header });
  }

  deleteUsuario(idUsuario: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Usuarios/' + idUsuario;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.delete(url + request, { headers: header });
  }

  findUsuario(idUsuario: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Usuarios/' + idUsuario;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }
}
