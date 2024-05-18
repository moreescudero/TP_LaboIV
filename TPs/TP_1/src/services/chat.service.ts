import { Injectable } from '@angular/core';
import { getDatabase, ref, set, onValue, push, get, child} from "firebase/database";
import { AuthService } from './auth.services';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  items: any;
  database: any;

  constructor(private as: AuthService) {
    this.database = getDatabase();
    this.leerData();
  }

  escribirDataUsuario(mensaje: any) {
    let listaReferencia = ref(this.database, 'chat');
    let nuevoMensaje = push(listaReferencia);
    set(nuevoMensaje, mensaje)
  }

  leerData() {
    let referencia = ref(this.database, 'chat');

    onValue(referencia, (snapshot) => {
      this.items = Object.values(snapshot.val());
    }); 
  }
}
