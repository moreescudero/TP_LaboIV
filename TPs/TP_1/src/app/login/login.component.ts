import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuario.models';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  nombre: string = '';
  clave: string = '';
  email: string = '';
  autologin: boolean = false;

  constructor(public as: AuthService) {}

  registrar() {
    let usuario: Usuario = {
      usuario: this.nombre,
      email: this.email,
      clave: this.clave
    }

    this.as.registrar(usuario);
  }

  ingresoRapido() {
    if (this.autologin === false) {
      this.email = 'escuderomore1@gmail.com';
      this.clave = '123456'
    } else {
      this.email = '';
      this.clave = '';
    }
  }
}