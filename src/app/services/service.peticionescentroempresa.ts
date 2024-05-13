import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class ServicePeticionesCentroEmpresa {
  constructor(private _http: HttpClient) {}

  createPeticionAltaEmpresa(idEmpresaCentro: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/PeticionesCentroEmpresa';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.post(url + request, null, {
      headers: header,
      params: { idcentroempresa: idEmpresaCentro },
    });
  }

  getPeticionesCentroEmpresa(): Observable<any> {
    let url = environment.urlApi;
    let request = '/api/PeticionesCentroEmpresa';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  deletePeticionEmpresa(idPeticion: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/peticionescentroempresa';
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.delete(url + request, {
      headers: header,
      params: { idPeticion: idPeticion },
    });
  }

  anularEmpresa(idPeticion: number): Observable<any> {
    let url = environment.urlApi;
    let request =
      'api/PeticionesCentroEmpresa/DeletePeticionEmpresaAll/' + idPeticion;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.delete(url + request, { headers: header });
  }
}
