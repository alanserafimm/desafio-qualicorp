
import { IDataTable, IDetail, IResult } from "../../../tools/generic/generic.interfaces";
import { GenericServices } from "../../../tools/generic/generic.services";
import { APICliente, ICliente } from "../models/cliente.models";
import { isNullOrUndefined } from "util";
import { ObjectId } from 'mongodb';

export class ClienteServices extends GenericServices {

    public api: string = APICliente;

    constructor() {
        super();
        super.api = this.api;
    };

    public async beforeInsert(obj: ICliente) {
        obj['_id'] = (isNullOrUndefined(obj['_id'])) ? new ObjectId(obj['_id']) : obj['_id'];
        obj['cpf'] = (!isNullOrUndefined(obj.cpf)) ? String(obj.cpf) : obj.cpf;

        return obj;
    };

    public formTitle() { return "Gestão de Cliente" };

    public formDataTable(): IDetail[] {
        var response: IDetail[] = [];

        response.push(<IDetail>{ name: "cpf", text: "Cpf" });
        response.push(<IDetail>{ name: "nome", text: "Nome" });
        response.push(<IDetail>{ name: "email", text: "Email" });

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

        if (!isNullOrUndefined(obj["cpf"])) {
            var format = this.pad_with_zeroes(Number(obj["cpf"]), 11);;

            if (format.length <= 11) { obj["cpf"] = format.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4"); };
        };

        return obj;
    };

    public verificarItemDuplicado(cpj: string) {
        return new Promise(async (resolve, reject) => {
            var item = await this.searchFirst<ICliente>({ cpf: cpj });

            if (item.success) return resolve(this.InvalidResult("Cpf informado já cadastrado."));

            resolve(this.OkResult("Validado."));
        })
    };

}