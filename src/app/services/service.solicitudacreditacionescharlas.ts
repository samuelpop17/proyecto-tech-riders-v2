import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class ServiceSolicitudAcreditacionesCharlas {
  constructor(private _http: HttpClient) {}

  getAcreditacionesCharlas(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/SolicitudAcreditacionesCharlas';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  solicitudAcreditacionEliminar(idPeticionCharla: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/solicitudacreditacionescharlas/' + idPeticionCharla;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.delete(url + request, { headers: header });
  }

  createSolicitudAcreditacionCharla(idCharla: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/SolicitudAcreditacionesCharlas';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.post(url + request, null, {
      headers: header,
      params: { idcharla: idCharla },
    });
  }
}
