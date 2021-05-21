import { isNullOrUndefined } from "util";
import { GenericServices } from "../../../tools/generic/generic.services";
import { ICliente, mongoCliente } from "../models/cliente.models";
import { APIClienteTelefone, IClienteTelefone, mongoClienteTelefone } from "../models/clientetelefone.models";
import { ClienteServices } from "../services/clienteservices.services";


export class ClienteTelefoneResources extends GenericServices {

    api: string = APIClienteTelefone;
    clienteServices: ClienteServices;

    constructor() {
        super();
        super.api = this.api;
        this.clienteServices = new ClienteServices();
    };

    public async register() {
        var listInsert: IClienteTelefone[] = [];

        var response = await this.clienteServices.searchFirst<ICliente>({ cpf: "99999999999" });

        if (response.success) {
            listInsert.push(<IClienteTelefone>{ clienteId: String(response.data?._id), prefixo: "17", numero: "991733660" });

            for (let index = 0; index < listInsert.length; index++) {
                const element = listInsert[index];
                await this.InsertIfNotExist(element, { clienteId: element.clienteId, numero: element.numero });
            };
        };

    };

}

export const clienteTelefoneResources = new ClienteTelefoneResources();