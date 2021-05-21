
import Router from "koa-router";

import { GenericController } from "../../../tools/generic/generic.controller";
import { APIClienteTelefone, IClienteTelefone } from "../models/clientetelefone.models";
import { ClienteTelefoneServices } from "../services/clientetelefoneservices.services";

export class ClienteTelefoneController extends GenericController<IClienteTelefone> {
     public api: string = APIClienteTelefone;

     service: ClienteTelefoneServices;

     constructor() {
          super();
          this.service = new ClienteTelefoneServices();
     };

     public applyRoutes(koaRouter: Router) {
          super.applyRoutes(koaRouter);
     };

};

export const clienteTelefoneController = new ClienteTelefoneController();

