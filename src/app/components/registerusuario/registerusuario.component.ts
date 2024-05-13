import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaCentro } from 'src/app/models/EmpresaCentro';
import { Provincia } from 'src/app/models/Provincia';
import { Role } from 'src/app/models/Role';
import { Usuario } from 'src/app/models/Usuario';
import { ServiceEmpresasCentros } from 'src/app/services/service.empresascentros';
import { ServicePeticionesAltaUsers } from 'src/app/services/service.peticionesaltausers';
import { ServiceProvincias } from 'src/app/services/service.provincias';
import { ServiceQueryTools } from 'src/app/services/service.querytools';
import { ServiceUsuarios } from 'src/app/services/service.usuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registerusuario',
  templateUrl: './registerusuario.component.html',
  styleUrls: ['./registerusuario.component.css'],
})
export class RegisterusuarioComponent implements OnInit {
  @ViewChild('controlnombre') controlNombre!: ElementRef;
  @ViewChild('controlapellidos') controlApellidos!: ElementRef;
  @ViewChild('controlemail') controlEmail!: ElementRef;
  @ViewChild('controltlf') controlTlf!: ElementRef;
  @ViewChild('controllinkedin') controlLinkedin!: ElementRef;
  @ViewChild('controlpassword') controlPassword!: ElementRef;
  @ViewChild('selectrole') selectRole!: ElementRef;
  @ViewChild('selectprovincia') selectProvincia!: ElementRef;
  @ViewChild('selectempresacentro') selectEmpresaCentro!: ElementRef;

  public roles!: Role[];
  public provincias!: Provincia[];
  public empresasCentros!: EmpresaCentro[];
  public publicEmpresasCentros!: EmpresaCentro[];
  public roleElegido!: number;
  public publico: number = 0;

  constructor(
    private _serviceProvincias: ServiceProvincias,
    private _serviceEmpresasCentros: ServiceEmpresasCentros,
    private _serviceUsuarios: ServiceUsuarios,
    private _servicePeticionesAltaUsers: ServicePeticionesAltaUsers,
    private _serviceQueryTools: ServiceQueryTools,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this._serviceProvincias.getProvincias().subscribe((response) => {
        this.provincias = response;
      });
      this.roles = [
        { idRole: 2, tipoRole: 'PROFESOR' },
        { idRole: 3, tipoRole: 'TECHRIDER' },
        { idRole: 4, tipoRole: 'REPRESENTANTE' },
      ];
      this.roleElegido = 3;
      this._serviceEmpresasCentros
        .getEmpresasCentrosActivas()
        .subscribe((response) => {
          this.empresasCentros = response;
          this.publicEmpresasCentros = this.empresasCentros.filter(
            (empresaCentro) => empresaCentro.idTipoEmpresa == 1
          );
        });
    } else this._router.navigate(['/usuario/perfil']);
  }

  changeEmpresasCentros(): void {
    let tipoEmpresa!: number;
    this.roleElegido = this.selectRole.nativeElement.selectedOptions[0].value;
    this.roleElegido == 2 ? (tipoEmpresa = 2) : (tipoEmpresa = 1);
    this.publicEmpresasCentros = this.empresasCentros.filter(
      (empresaCentro) => empresaCentro.idTipoEmpresa == tipoEmpresa
    );
  }

  registerUsu(): void {
    let idEmpresaCentro =
      this.selectEmpresaCentro.nativeElement.selectedOptions[0].value;
    if (idEmpresaCentro == 0) idEmpresaCentro = null;
    let usuario: Usuario = {
      idUsuario: 0,
      nombre: this.controlNombre.nativeElement.value,
      apellidos: this.controlApellidos.nativeElement.value,
      email: this.controlEmail.nativeElement.value,
      telefono: this.controlTlf.nativeElement.value,
      linkedIn: this.controlLinkedin.nativeElement.value,
      password: this.controlPassword.nativeElement.value,
      idRole: this.selectRole.nativeElement.selectedOptions[0].value,
      idProvincia: this.selectProvincia.nativeElement.selectedOptions[0].value,
      idEmpresaCentro: idEmpresaCentro,
      estado: 2,
      linkedInVisible: this.publico ? 1 : 0,
    };
    this._serviceUsuarios.createUsuario(usuario).subscribe((response) => {
      let idUsuario = response.idUsuario;
      this._servicePeticionesAltaUsers
        .createPeticionAltaUser(idUsuario)
        .subscribe((response) => {
          this._serviceQueryTools.actualizacionPeticiones();
          Swal.fire({
            color: '#333333',
            icon: 'success',
            showConfirmButton: false,
            text: 'Usuario creado. Tendrá que ser validado por el administrador',
            timer: 4000,
            timerProgressBar: true,
            title: 'Registro con éxito',
          }).then((result) => {
            this._router.navigate(['/login']);
          });
        });
    });
  }
}
