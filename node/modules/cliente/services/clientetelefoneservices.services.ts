
import { isNullOrUndefined } from "util";
import { GenericServices } from "../../../tools/generic/generic.services";
import { APIClienteTelefone, IClienteTelefone } from "../models/clientetelefone.models";
import { ObjectId } from 'mongodb';
import { IDataTable, IDetail } from "../../../tools/generic/generic.interfaces";

export class ClienteTelefoneServices extends GenericServices {

    public api: string = APIClienteTelefone;

    constructor() {
        super();
        super.api = this.api;
    };

    public formTitle() { return "Telefones" };


    public async beforeInsert(obj: IClienteTelefone) {
        obj['_id'] = (isNullOrUndefined(obj['_id'])) ? new ObjectId(obj['_id']) : obj['_id'];
        obj['numero'] = (!isNullOrUndefined(obj.numero)) ? String(obj.numero) : obj.numero;

        return obj;
    };

    public formDataTable(): IDetail[] {
        var response: IDetail[] = [];

        response.push(<IDetail>{ name: "numero", text: "Número" });

        return response;
    };

    public formDataTableOptions(options: IDataTable): IDataTable {

        options.onEdit = true;
        options.onDelete = true;
        options.onNew = true;

        return options;
    };

    public async comandMongo() {
        var query = await this.searchAll({});

        return query;
    };

    public async convertData(obj: any) {

        if (!isNullOrUndefined(obj["numero"])) {
            var prefixo = this.pad_with_zeroes(Number(obj["prefixo"]), 3);
            var numero = this.pad_with_zeroes(Number(obj["numero"]), 9);

            obj["numero"] = await this.formatTelphone(prefixo + numero);
        };

        return obj;
    };

    private formatTelphone(numero: string) {
        let cleaned = ('' + numero).replace(/\D/g, '');


        let match = cleaned.match(/^(\d{3})(\d{5})(\d{4})$/);

        if (match) { return '(' + match[1] + ') ' + match[2] + '-' + match[3] };

        return numero;
    };

}