import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class ServicePeticionesTecnologias {
  constructor(private _http: HttpClient) {}

  getPeticionesTecnologia(): Observable<any> {
    let url = environment.urlApi;
    let request = '/api/PeticionesTecnologias';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  deletePeticionTecnologia(idPeticionTecnologia: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/peticionestecnologias/' + idPeticionTecnologia;
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.delete(url + request, { headers: header });
  }

  createPeticionTecnologia(tecnologiaNom: string): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/PeticionesTecnologias';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.post(url + request, null, {
      headers: header,
      params: { tecnologia: tecnologiaNom },
    });
  }
}
