import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class ServiceAuth {
  constructor(private _http: HttpClient) {}

  loginUser(email: string, password: string): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Auth/Login';
    let json = JSON.stringify({
      email: email,
      password: password,
    });
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(url + request, json, { headers: header });
  }
}
