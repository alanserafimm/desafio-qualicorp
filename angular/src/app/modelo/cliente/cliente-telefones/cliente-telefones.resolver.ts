import { Injectable } from '@angular/core';
import { GenericServices } from 'src/tools/services/generic.services';
import { APIClienteTelefones } from './cliente-telefones.interfaces';


@Injectable({ providedIn: 'root' })
export class ClienteTelefonesResolver {
    constructor(public services: GenericServices) { }

    resolve(): Promise<any> | any {
        return new Promise(async (resolve, reject) => {

            var formInicialize = await this.services.formInicialize(APIClienteTelefones);

            resolve(formInicialize);
        });
    }
}