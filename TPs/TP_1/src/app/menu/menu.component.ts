import { Component, Input } from '@angular/core';
import { AuthService } from 'src/services/auth.services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() mostrarHome: boolean = true;
  @Input() mostrarQuienSoy: boolean = true;
  @Input() mostrarEstadisticas: boolean = true;
  @Input() mostrarChat: boolean = true;

  constructor(public as: AuthService) {};
}
