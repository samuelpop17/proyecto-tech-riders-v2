import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class ServicePeticionesAltaUsers {
  constructor(private _http: HttpClient) {}

  createPeticionAltaUser(idUsuario: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/PeticionesAltaUsers';
    return this._http.post(url + request, null, {
      params: { iduser: idUsuario },
    });
  }

  getPeticionesAltaUser(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/PeticionesAltaUsers';
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.get(url + request, { headers: header });
  }

  eliminarPeticionUsuario(idPeticion: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/peticionesaltausers';
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.delete(url + request, {
      headers: header,
      params: { idPeticion: idPeticion },
    });
  }
}
