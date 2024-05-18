import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MayorOMenorComponent } from './mayor-o-menor.component';
import { MayorOMenorRoutingModule } from './mayor-o-menor-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MayorOMenorRoutingModule
  ],
  providers: [
  ],
})
export class MayorOMenorModule { }
