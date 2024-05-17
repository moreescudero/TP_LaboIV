import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Usuario } from 'models/usuario.models';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  usuarioLogueado: Usuario = {};
  log: Usuario = {};

  constructor(private afAuth: AngularFireAuth, public router: Router, private fs: FirestoreService, private toastr: ToastrService) {}

  registrar(usuario: any) {
    this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.clave).then((userCredentials) => {
      this.usuarioLogueado = usuario;
      this.toastr.success('usuario registrado! :D');
      this.router.navigate(['/home']);

    }).catch((error) => {
      
      switch(error.code){
        case 'auth/email-already-in-use':
          this.toastr.error('el mail ya está registrado');
        break;
        default:
          this.toastr.error('ocurrió un error al registrar el usuario');
      }

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

      switch(error.code) {
        case 'auth/user-not-found':
          this.toastr.error('no se encontró el usuario');
        break;
        case 'auth/missing-email':
        case 'auth/missing-password':
          this.toastr.error('no puede haber ningún campo vacío');
        break;
        case 'auth/wrong-password':
        case 'auth/wrong-email':
        case 'auth/invalid-email':
        case 'auth/invalid-password':
          this.toastr.error('la contraseña o el email son incorrectos');
        break;
      }

    });
  }

  obtenerUsuarioActual() {
    return this.afAuth.authState;
  } 

  cerrarSesion() {
    this.usuarioLogueado.email = undefined;
    this.usuarioLogueado.clave = undefined;
    this.afAuth.signOut();
    this.router.navigate(['/login']); 
  }
}