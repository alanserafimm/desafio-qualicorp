import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericControllers } from './controllers/generic.controllers';
import { GenericServices } from './services/generic.services';
import { ReactiveFormsModule } from '@angular/forms';
import { WidgetsModule } from './widgets/widgets.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WidgetsModule,
  ],
  exports: [
    WidgetsModule
  ],
  providers: [
    GenericControllers,
    GenericServices
  ]
})
export class ToolsModule { }
