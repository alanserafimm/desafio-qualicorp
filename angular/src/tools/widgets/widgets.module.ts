import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from './data-table/data-table.component';
import { DialogComponent } from './dialog/dialog.component';
import { SpinnerButtonComponent } from './spinner-button/spinner-button.component';
import { MaterialModule } from '../material/material/material.module';
import { WidgetsServices } from './widgets.services';
import { DataTableServices } from './data-table/data-table.services';




@NgModule({
  declarations: [
    DataTableComponent,
    DialogComponent,
    SpinnerButtonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    DataTableComponent,
    DialogComponent,
    SpinnerButtonComponent
  ],
  providers: [WidgetsServices, DataTableServices],
  entryComponents: [DialogComponent]
})
export class WidgetsModule { }
