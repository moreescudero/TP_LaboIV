import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../../../models/usuario.models';
import { AuthService } from '../../services/auth.services';
import { identifierName } from '@angular/compiler';
import { Router } from '@angular/router';

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

  constructor(public as: AuthService, private router: Router) {}

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