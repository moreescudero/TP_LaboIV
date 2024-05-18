import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/services/api.service';
import { AuthService } from 'src/services/auth.services';
import { FirestoreService } from 'src/services/firestore.service';

@Component({
  selector: 'app-mayor-o-menor',
  templateUrl: './mayor-o-menor.component.html',
  styleUrls: ['./mayor-o-menor.component.scss']
})
export class MayorOMenorComponent implements OnInit {
  cartas: any;
  cartasRestantes: any;
  cartaInicial: any;
  cartaComparacion: any;
  inicio: boolean = false;
  puntaje: number = 0;

  constructor(public toastr: ToastrService, public api: ApiService, private fs: FirestoreService, private as: AuthService) {
    //this.cartaInicial = {img:'../../../assets/reverso-carta.png',value : 0};
    this.cartaInicial = {img:'../../../../assets/reverso_carta.png',value : 0};
    this.cartaComparacion = {img:'../../../../assets/reverso_carta.png',value : 0};
    this.iniciarlizarMazo();
  }

  ngOnInit() {
  }

  iniciarlizarMazo() {
    this.api.setearUrl("https://deckofcardsapi.com/api/deck/new/draw/?count=52");
    this.api.llamarApi().subscribe((dato: any) => {
      this.cartas = dato.cards;
      //console.log(this.cartas); trae bien las cartas
    });
  }

  inicializarCarta() {
    let rnd: number = Math.floor(Math.random() * this.cartas.length);
    this.asignarValores(this.cartas[rnd], this.cartaInicial);
    this.cartasRestantes = this.cartas.filter((carta: any) => carta != this.cartaInicial);
    this.inicio = true;
  }

  generarCarta() {
    let rnd: number = Math.floor(Math.random() * this.cartas.length);
    this.asignarValores(this.cartas[rnd], this.cartaComparacion);
  }

  asignarValores(cartaMazo: any, carta: any) {
    carta.img = cartaMazo.image;

    switch(cartaMazo.value) {
      case 'ACE':
        carta.value = 1;
      break;
      case 'JACK':
        carta.value = 10;
      break;
      case 'QUEEN':
        carta.value = 11;
      break;
      case 'KING':
        carta.value = 12;
      break;
      default:
        carta.value = parseInt(cartaMazo.value);
      break;
    }
  }

  mostrarCarta() {
    this.cartasRestantes = this.cartas.filter((carta: any) => carta != this.cartaComparacion);
    setTimeout(() => {
      this.cartaInicial.img = this.cartaComparacion.img;
      this.cartaInicial.value = this.cartaComparacion.value;
      this.cartaComparacion.img = '../../../../assets/reverso_carta.png'
      this.cartaComparacion.value = 0;

    // console.log('mostrarCarta: valor carta inicial: ' + this.cartaInicial.value);
    // console.log('valor carta comparación: ' + this.cartaComparacion.value);
    }, 1000);
  }

  comparar(condicion: string) {
    this.generarCarta();
    // console.log('carta comparacion: ' + this.cartaComparacion.value);
    // console.log('carta inicial: ' + this.cartaInicial.value);

    if((this.cartaComparacion.value > this.cartaInicial.value && condicion == 'mayor') || (this.cartaComparacion.value < this.cartaInicial.value && condicion == 'menor')) {
      this.puntaje++;
      this.mostrarCarta();
    }
    else if(this.cartaComparacion.value == this.cartaInicial.value) {
      this.toastr.warning('la carta es del mismo valor', 'empate :s');
      this.mostrarCarta();
    }
    else {
      this.perder();
    }
    
  }

  reiniciar() {
    this.cartaInicial.img = '../../../../assets/reverso_carta.png'; 
    this.cartaInicial.value = 0;
    this.cartaComparacion.img = '../../../../assets/reverso_carta.png'; 
    this.cartaComparacion.value = 0;
    this.puntaje = 0;
    this.inicio = false;  
  }

  perder() {
    this.toastr.error("no adivinaste la comparación. puntaje: " + this.puntaje, "perdiste :(");
    setTimeout(() => {
      let fecha: Date = new Date();
      let resultado = {
        usuario: this.as.log.email,
        hora: fecha,
        puntos: this.puntaje,
        juego: 'mayor o menor'
      }
      this.fs.agregarResultado(resultado);
      this.reiniciar();
    }, 2500);
  }
}
