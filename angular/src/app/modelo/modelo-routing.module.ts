import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteTelefonesResolver } from './cliente/cliente-telefones/cliente-telefones.resolver';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteResolver } from './cliente/cliente.resolver';


const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
    resolve: {
      cliente: ClienteResolver,
      clientetelefones: ClienteTelefonesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeloRoutingModule { }
