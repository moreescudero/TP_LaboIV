import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/services/auth.services';
import { FirestoreService } from 'src/services/firestore.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit, AfterViewInit {

  palabrasAhorcado: string[] = [
    'elefante',
    'computadora',
    'bicicleta',
    'guitarra',
    'helado',
    'playa',
    'carpincho',
    'jirafa',
    'zapato',
    'durazno'
  ];
  palabra: string = "";
  palabraJuego: string = "";
  letras: string[] = [];
  errores: number = 0;
  aciertos: number = 0;
  deshabilitado: boolean = false;
  @ViewChild('imagen') imagenElement: ElementRef<HTMLImageElement> | undefined;

  constructor(private toastr: ToastrService, private fs: FirestoreService, private as: AuthService) {
    this.letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.inicializarPalabra();
  }

  ngOnInit(): void {
  } 

  /*
    actualiza la imagen según los errores del juego
  */
  ngAfterViewInit(): void {
    let imagen = this.imagenElement?.nativeElement as HTMLImageElement;
    imagen.src =  "https://jadigar.neocities.org/codepen/ahorcado-"+ this.errores + ".jpg";
  }

  /*
    inicia el juego
  */
  inicializarPalabra() {
    let rnd: number = Math.floor(Math.random() * this.palabrasAhorcado.length);
    this.palabra = this.palabrasAhorcado[rnd];
    this.generarEspacios();
  }

  /*
    genera los espacios para la palabra a adivinar
  */
  generarEspacios() {
    for (let i = 0; i < this.palabra.length; i++) {
      this.palabraJuego += "_"; 
    }
  }

  /*
    el usuario elige la letra y se comprueba si está dentro de la palabra o no
  */
  elegirLetra(letra: string) {
    if(this.buscarLetra(letra)) {
      if(this.aciertos === this.palabra.length) {
        this.ganar();
      }
    }
    else {
      this.errores++;   
      this.ngAfterViewInit();
      
      if(this.errores === 6) {
        this.perder();
      }
    }
  }

  /*
    búsqueda de la letra ingresada en la palabra en juego
  */
  buscarLetra(letra: string): boolean {
    let encontroLetra: boolean = false;
    for (let i = 0; i < this.palabra.length; i++) {
      console.log(this.palabra[i]);
      console.log(letra);
      if(this.palabra[i] === letra) {
        encontroLetra = true;
        this.palabraJuego = this.palabraJuego.slice(0,i) + letra + this.palabraJuego.slice(i + 1);
        this.aciertos++;
      }
    }
    return encontroLetra;
  }

  /*
    si el usuario llegó a 6 aciertos pierde el juego 
  */
  perder() {
    this.toastr.error("alcanzaste el número máximo de erroes. puntaje: 0", "perdiste :(");
    setTimeout(() => {
      this.enviarDatos(0);
    }, 2200);
  }

  /*
    si el usuario adivina la palabra gana el juego
  */
  ganar() {
    this.toastr.success("adivinaste la palabra. puntaje: 10", "ganaste :D");
    setTimeout(() => {
      this.enviarDatos(10);
    }, 2200);
  }

  /*
    registra el resultado en la base de datos
  */
  enviarDatos(puntaje: number) {
    let fecha: Date = new Date();
    let resultado = {
      usuario: this.as.usuarioLogueado.email,
      hora: fecha,
      puntos: puntaje,
      juego: 'ahorcado'
    }
    this.fs.agregarResultado(resultado);
    this.reiniciarJuego();
  }

  /*
    se reinicia el juego después de haber perdido o ganado
  */
  reiniciarJuego() {
    this.errores = 0;
    this.aciertos = 0;
    this.palabra = "";
    this.palabraJuego = "";
    this.inicializarPalabra();
  }
  
}
