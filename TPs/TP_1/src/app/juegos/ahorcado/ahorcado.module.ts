import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AhorcadoComponent } from './ahorcado.component';
import { AhorcadoRoutingModule } from './ahorcado-routing.module';

@NgModule({
  declarations: [
    //AhorcadoComponent
  ],
  imports: [
    CommonModule,
    AhorcadoRoutingModule
  ],
  exports: [
    //AhorcadoComponent
  ],
  providers: [
  ],
})
export class AhorcadoModule { }
