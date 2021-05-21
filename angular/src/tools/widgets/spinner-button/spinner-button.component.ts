import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { ISpinnerButton } from './spinner-button.interfaces';

@Component({
  selector: 'app-spinner-button',
  templateUrl: './spinner-button.component.html',
  styleUrls: ['./spinner-button.component.css']
})
export class SpinnerButtonComponent implements OnInit, AfterViewInit {

  @Input() set option(value: ISpinnerButton) {
    if (isNullOrUndefined(value)) return;
    this.options = value;
  };

  constructor() { }

  ngAfterViewInit(): void {
    this.options.start = () => {
      this.ativo = true;
    };
    this.options.stop = () => {
      this.ativo = false
    };
  }

  options: ISpinnerButton;
  ativo: boolean = false;

  ngOnInit() {
  }

  public classSpinner() {
    if (!this.ativo) return "cssIcon";

    return "cssSppinner";
  }

}
