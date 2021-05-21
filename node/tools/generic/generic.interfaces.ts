

import { ObjectId } from 'mongodb';

export interface IFormInicialize {
    title: string,
    captions: ICaptions[]
    datatable: IDataTable
};

export interface ICaptions {
    text: string,
    name: string
};

export interface IDataTable {
    widgetId: string;
    url: string;
    data: IDetail[];
    onEdit: boolean;
    onDelete: boolean;
    onNew: boolean;

    onClickEdit(): void;
    onClickDelete(): void;
    onClickNew(): void;
};

export interface IDetail {
    name: string,
    text: string
};

export interface IResult<T> {
    id?: string;
    data?: T;
    message?: string;
    modelState?: any;
    success: boolean;
    url?: string;
}

export interface IModelo {
    _id?: ObjectId;
}

