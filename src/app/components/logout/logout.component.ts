import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('idUsuario');
      localStorage.removeItem('role');
    }
    this._router.navigate(['/login']);
  }
}
