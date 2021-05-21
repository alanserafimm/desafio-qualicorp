import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModeloRoutingModule } from './modelo-routing.module';
import { ClienteComponent } from './cliente/cliente.component';
import { ToolsModule } from 'src/tools/tools.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteResolver } from './cliente/cliente.resolver';
import { MaterialModule } from 'src/tools/material/material/material.module';
import { ClienteTelefonesComponent } from './cliente/cliente-telefones/cliente-telefones.component';
import { ClienteTelefonesResolver } from './cliente/cliente-telefones/cliente-telefones.resolver';


@NgModule({
  declarations: [
    ClienteComponent,
    ClienteTelefonesComponent
  ],
  imports: [
    CommonModule,
    ModeloRoutingModule,
    ToolsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [ClienteResolver, ClienteTelefonesResolver]
})
export class ModeloModule { }
