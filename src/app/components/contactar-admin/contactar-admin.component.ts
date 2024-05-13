import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactar-admin',
  templateUrl: './contactar-admin.component.html',
  styleUrls: ['./contactar-admin.component.css'],
})
export class ContactarAdminComponent {
  constructor(private _router: Router) {}

  enviarSolicitud(): void {
    // COSA DEL BACK
    this._router.navigate(['/usuario/perfil']);
  }
}
