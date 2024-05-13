import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class ServiceProvincias {
  constructor(private _http: HttpClient) {}

  findProvincia(id: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Provincias/' + id;
    return this._http.get(url + request);
  }

  getProvincias(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Provincias';
    return this._http.get(url + request);
  }
}
