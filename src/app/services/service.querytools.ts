import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class ServiceQueryTools {
  // Observable y observer con el número de peticiones pendientes
  // PERMITE CAMBIAR EL NÚMERO EN UN COMPONENTE DE PETICIONES Y QUE SE ACTUALIZE EN EL MENÚ
  private peticionesActualizadas = new BehaviorSubject<number>(0);
  // Menú se suscribe a numPeticiones$ para actualizarse a tiempo real
  numPeticiones$ = this.peticionesActualizadas.asObservable();

  // Actualiza el número de peticiones pendientes
  actualizacionPeticiones() {
    this.getAllPeticiones().subscribe((response: any[]) =>
      this.peticionesActualizadas.next(response.length)
    );
  }

  // Num charlas pendientes
  private charlasActualizadas = new BehaviorSubject<number>(0);
  numCharlas$ = this.charlasActualizadas.asObservable();
  actualizacionCharlas() {
    this.charlasPorVerTechRiders().subscribe((response: any[]) => {
      this.charlasActualizadas.next(response.length);
    });
  }

  constructor(private _http: HttpClient) { }

  findTecnologiasTechRider(id: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/FindTecnologiasTechrider';
    let header = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this._http.get(url + request, {
      headers: header,
      params: { idtechrider: id },
    });
  }

  findCursosProfesor(idProfesor: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/FindCursosProfesor/' + idProfesor;
    let header = {
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.get(url + request, { headers: header });
  }

  findEmpresaCentroUsuario(idUsuario: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/FindEmpresaTechRider/' + idUsuario;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  getCharlasView(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/CharlasViewAll';
    let header = {
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.get(url + request, { headers: header });
  }

  getMisTechRidersResponsable(idempresa: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/FindTechRidersEnEmpresa/' + idempresa;
    return this._http.get(url + request);
  }

  getCharlasTechResponsable(idempresa: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/FindCharlasTechriderEmpresa/' + idempresa;
    return this._http.get(url + request);
  }

  findCharlaView(idCharla: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/FindCharlaView';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, {
      headers: header,
      params: { idcharla: idCharla },
    });
  }

  charlasPorVerTechRiders(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/FindCharlasPendientesTecnologiasTechrider';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  estadoCharlasTechRiders(): Observable<any> {
    let url = environment.urlApi;
    let request =
      'api/QueryTools/CharlasTechRider/' + localStorage.getItem('idUsuario');
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  getTechRiders(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/querytools/todostechridersactivos';
    return this._http.get(url + request);
  }

  getAllPeticiones(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/TodasPeticionesFormato';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  getTecnologiasTechRider(idTechRider: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/FindTecnologiasTechrider';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, {
      headers: header,
      params: { idtechrider: idTechRider },
    });
  }

  getCursosProfesorAll(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/CursosProfesorAll';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, {
      headers: header,
    });
  }
}
