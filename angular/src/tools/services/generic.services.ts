import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { configSystem } from '../config/config';
import { GenericControllers } from '../controllers/generic.controllers';
import { DataTableServices } from '../widgets/data-table/data-table.services';
import { WidgetsServices } from '../widgets/widgets.services';
import { IResult } from './generic.interfaces';

@Injectable()
export class GenericServices {

    constructor(
        public apiServices: GenericControllers,
        public widgetsServices: WidgetsServices,
        public dataTableServices: DataTableServices       
    ) { };

    public getUrl(apiRoute: string) {
        return `http://${configSystem.url}:${configSystem.port}/${apiRoute}`;
    };

    public formInicialize(api: string) { return this.apiServices.get(this.getUrl(api) + "/forminicialize"); };

};