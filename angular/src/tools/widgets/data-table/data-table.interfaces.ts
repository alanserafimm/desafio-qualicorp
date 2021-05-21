export interface PeriodicElement {
    Título: string;
    Multa: string;
    Juros: string;
}

export const ELEMENT_DATA: PeriodicElement[] = [
    { Título: "101010", Multa: '2%', Juros: "1% ao mês" },
];

// displayedColumns: string[] = ['name'];
// dataSource = ELEMENT_DATA;

export interface IDataTable {
    widgetId: string
    url: string;
    data: IDetail[];
    onEdit: boolean;
    onDelete: boolean;
    onNew: boolean;

    onClickEdit(id: string): void;
    onClickDelete(id: string): void;
    onClickNew(id: string): void;
    refresh(options: IDataTable): void;
};

export interface IDetaTableOptions {
};

export interface IDetail {
    name: string,
    text: string
};
