import { Injectable } from "@angular/core";
import { GenericControllers } from "src/tools/controllers/generic.controllers";
import { IDataTable, IDetail } from "./data-table.interfaces";


declare var $: any;


@Injectable()
export class DataTableServices {

    constructor(private apiServices: GenericControllers) { }


    public async initData(options: IDataTable): Promise<string[]> {
        var response = await this.apiServices.get<any>(options.url);

        if (response.success) return response.data;

        return [];
    };



}