import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'ahorcado',
    loadChildren: () => import('../juegos/ahorcado/ahorcado.module')
      .then(mod => mod.AhorcadoModule)
  },
  {
    path: 'mayor-o-menor',
    loadChildren: () => import('../juegos/mayor-o-menor/mayor-o-menor.module')
      .then(mod => mod.MayorOMenorModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
