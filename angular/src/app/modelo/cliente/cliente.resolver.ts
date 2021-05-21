import { Injectable } from '@angular/core';
import { GenericServices } from 'src/tools/services/generic.services';
import { APICliente } from './cliente.interfaces';

@Injectable({ providedIn: 'root' })
export class ClienteResolver {
    constructor(public services: GenericServices) { }

    resolve(): Promise<any> | any {
        return new Promise(async (resolve, reject) => {

            var formInicialize = await this.services.formInicialize(APICliente);
            
            resolve(formInicialize);
        });
    }
}