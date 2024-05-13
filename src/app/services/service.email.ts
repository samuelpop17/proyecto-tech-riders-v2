import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class ServiceEmail {
    constructor(private _http: HttpClient) { }

    enviarMail(email: string[], asunto: string, mensaje: string): Observable<any> {
        let url = environment.logicApp;
        let json = JSON.stringify({
            emails: email,
            asunto: asunto,
            mensaje: mensaje
        });
        let header = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.post(url, json, { headers: header });
    }
}