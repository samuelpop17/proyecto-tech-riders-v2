import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class ServiceTipoTecnologias {
  constructor(private _http: HttpClient) {}

  getTipoTecnologias(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/TipoTecnologias';
    return this._http.get(url + request);
  }
}
