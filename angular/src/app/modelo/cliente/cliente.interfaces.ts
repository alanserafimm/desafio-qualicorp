import { IModelo } from "src/tools/services/generic.interfaces";

export const APICliente = "cliente";

export interface ICliente extends IModelo {
    cpf: string;
    nome: string;
    email: string;
}