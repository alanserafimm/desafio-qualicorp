import { Component, Input, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { IDataTable, IDetail } from './data-table.interfaces';
import { DataTableServices } from './data-table.services';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {


  constructor(public service: DataTableServices) { }


  @Input() set option(value: IDataTable) {
    if (isNullOrUndefined(value)) return;

    this.options = value;
  };

  @Input() set filter(values: string[]) {
    if (isNullOrUndefined(values)) return;

    this.dataMongo = values;
  };

  async ngOnInit() {

    this.dataMongo = await this.service.initData(this.options);

    await this.initColunms();

    if (this.options.onEdit) this.dataHeaders.unshift("edit");
    if (this.options.onDelete) this.dataHeaders.unshift("delete");
  };

  private initColunms() {
    for (let index = 0; index < this.options.data.length; index++) {
      var element = this.options.data[index];

      this.dataHeaders.push(element.name)
    };
  };

  onClickEdit($event) { this.options.onClickEdit($event._id); };
  onClickDelete($event) { this.options.onClickDelete($event._id); };
  onClickNew($event) { this.options.onClickNew($event); };

  options: IDataTable;

  dataSource: IDetail[] = [];
  dataHeaders: string[] = [];
  dataMongo: string[] = [];
}
