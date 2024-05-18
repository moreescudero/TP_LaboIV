import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, ref } from 'firebase/database';
import { AuthService } from 'src/services/auth.services';
import { ChatService } from 'src/services/chat.service';
import { Mensaje } from '../../../models/mensaje.models'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  mensajes: any;
  mensaje: Mensaje = {};
  objDiv: any;
  items: any;
  database: any;

  constructor(private cs: ChatService, public as: AuthService) {
    this.database = getDatabase();
    let referencia = ref(this.database, 'chat');
     
    onValue(referencia, (snapshot) => {
      this.mensajes = Object.values(snapshot.val());
      //cambie
    });

    this.mensaje = {
      usuario: '',
      mensaje: '',
      fecha: Date().toString(),
    }
   }

  ngOnInit(): void {
    
  }

  enviarMensaje() {
    let hora = new Date();
    this.mensaje.usuario = this.as.log.email;
    this.mensaje.fecha = hora.getHours() + ':' + hora.getMinutes();
    this.cs.escribirDataUsuario(this.mensaje);
    this.mensaje.mensaje = ''
    }
}
