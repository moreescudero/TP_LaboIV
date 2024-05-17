import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Usuario } from 'models/usuario.models';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  usuarioLogueado: Usuario = {};
  log: Usuario = {};

  constructor(private afAuth: AngularFireAuth, public router: Router, private fs: FirestoreService) {}

  registrar(usuario: any) {
    this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.clave).then((userCredentials) => {
      this.usuarioLogueado = usuario;
      this.router.navigate(['/home']);

    }).catch((error) => {
      //agregar toastr
      console.log( 'ocurrio un error en registrar', error);
    });
  }

  ingresar(email: string, clave: string) {
    this.afAuth.signInWithEmailAndPassword(email, clave).then(() => {
      this.usuarioLogueado.email = email;
      this.usuarioLogueado.clave = clave;

      let fecha: Date = new Date();
      this.log.email = email;
      this.log.clave = clave;
      this.log.fechaIngreso = fecha;

      this.router.navigate(['/home']);
      this.fs.agregarLog(this.log);
    }).catch(error => {
      //agregar toastr
    });
  }

  obtenerUsuarioActual() {
    return this.afAuth.authState;
  } 

  cerrarSesion() {
    this.afAuth.signOut();
    this.router.navigate(['/login']); 
  }
}