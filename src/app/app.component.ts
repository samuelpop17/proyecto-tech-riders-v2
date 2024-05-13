import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'proyectotechriders';

  ngOnInit(): void {
    /*
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('role');
    */
  }
}
