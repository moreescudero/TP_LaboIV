import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';

import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './juegos/mayor-o-menor/mayor-o-menor.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'quien-soy', component: QuienSoyComponent},
  { path: 'juegos/ahorcado', component: AhorcadoComponent},
  { path: 'juegos/mayor-o-menor', component: MayorOMenorComponent},
  { path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }