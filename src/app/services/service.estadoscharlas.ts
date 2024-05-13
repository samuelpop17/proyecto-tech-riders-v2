import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class ServiceEstadosCharlas {
  constructor(private _http: HttpClient) {}

  getEstadosCharlas(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/EstadosCharlas';
    return this._http.get(url + request);
  }
}
