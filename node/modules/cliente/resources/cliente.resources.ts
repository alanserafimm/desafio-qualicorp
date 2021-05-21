import { GenericServices } from "../../../tools/generic/generic.services";
import { APICliente, ICliente } from "../models/cliente.models";


export class ClienteResources extends GenericServices {

    api: string = APICliente;

    constructor() {
        super();
        super.api = this.api;
    };

    public async register() {
        var listInsert: ICliente[] = [];

        listInsert.push(<ICliente>{ cpf: "99999999999", email: "whalan.serafim@hotmail.com", nome: "Whalan" });
        listInsert.push(<ICliente>{ cpf: "86844769059", email: "gecow17911@64ge.com", nome: "Neymar" });
        listInsert.push(<ICliente>{ cpf: "43142684093", email: "becow17911@64ge.com", nome: "Messi" });        

        for (let index = 0; index < listInsert.length; index++) {
            const element = listInsert[index];
            await this.InsertIfNotExist(element, { cpf: element.cpf })
        };
    };

}

export const clienteResources = new ClienteResources();