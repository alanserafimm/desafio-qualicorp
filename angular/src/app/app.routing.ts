import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'modelo',
    pathMatch: 'full'
  },
  {
    path: 'modelo',
    loadChildren: () => import('./modelo/modelo.module').then(mod => mod.ModeloModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
