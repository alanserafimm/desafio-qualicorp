
import mongoose from 'mongoose';
import { IModelo } from '../../../tools/generic/generic.interfaces';

export const APICliente = "cliente";

export interface ICliente extends IModelo {
    cpf: string;
    nome: string;
    email: string;
};

export const SMCliente = new mongoose.Schema({
    cpf: { type: 'String' },
    nome: { type: 'String' },
    email: { type: 'String' },
}, { versionKey: false });

export const mongoCliente = mongoose.model(APICliente, SMCliente);

