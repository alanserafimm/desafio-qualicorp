import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IDialog } from './dialog.interfaces';
import { MAT_DIALOG_DATA } from "@angular/material";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.options = data;
  }

  ngOnInit() {
  }

  options: IDialog;
}
