import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuienSoyComponent } from './quien-soy.component';
import { QuienSoyRoutingModule } from './quien-soy-routing.module';

@NgModule({
  declarations: [
    //QuienSoyComponent
  ],
  imports: [
    CommonModule,
    QuienSoyRoutingModule
  ],
  exports: [
    //QuienSoyComponent
  ],
  providers: [
  ],
})
export class QuienSoyModule { }
