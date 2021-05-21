import { IDataTable } from "../widgets/data-table/data-table.interfaces";

export interface IFormInicialize {
    title: string,
    captions: ICaptions[]
    datatable: IDataTable
};

export interface IResult<T> {
    id?: string;
    data?: T;
    message?: string;
    modelState?: any;
    success: boolean;
    url?: string;
}

export interface ICaptions {
    text: string,
    name: string
};

export interface IModelo {
    _id?: string;
}