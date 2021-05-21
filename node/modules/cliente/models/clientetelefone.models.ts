
import mongoose from 'mongoose';
import { IModelo } from '../../../tools/generic/generic.interfaces';

export const APIClienteTelefone = "clientetelefone";

export interface IClienteTelefone extends IModelo {
    clienteId: string;
    numero: string;
    prefixo: string;
};

export const SMTClienteTelefone = new mongoose.Schema({
    clienteId: { type: 'String' },
    numero: { type: 'String' },
    prefixo: { type: 'String' }
}, { versionKey: false });

export const mongoClienteTelefone = mongoose.model(APIClienteTelefone, SMTClienteTelefone);

