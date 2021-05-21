import { IModelo } from "src/tools/services/generic.interfaces";

export const APIClienteTelefones = "clientetelefone";

export interface IClienteTelefones extends IModelo {
    clienteId: string;
    numero: string;
    prefixo: string;
}