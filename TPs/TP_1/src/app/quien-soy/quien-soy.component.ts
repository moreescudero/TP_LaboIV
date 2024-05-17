import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.services';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.scss']
})
export class QuienSoyComponent {

  constructor( public as: AuthService ) {} 
}