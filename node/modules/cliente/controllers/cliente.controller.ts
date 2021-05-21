
import Router from "koa-router";
import { isNullOrUndefined } from "util";

import { GenericController } from "../../../tools/generic/generic.controller";
import { APICliente, ICliente } from "../models/cliente.models";
import { ClienteServices } from "../services/clienteservices.services";

export class ClienteController extends GenericController<ICliente> {
     public api: string = APICliente;

     service: ClienteServices;

     constructor() {
          super();
          this.service = new ClienteServices();
     };

     public applyRoutes(koaRouter: Router) {

          koaRouter.get(`/${this.api}/verificarduplicado/:cpf`, async (ctx: any) => {
               var cpf = ctx.params.cpf;

               if (isNullOrUndefined(cpf)) return ctx.body = "Nenhum parâmetro informado!";

               ctx.body = await this.service.verificarItemDuplicado(cpf);
          });

          super.applyRoutes(koaRouter);
     };

};

export const clienteController = new ClienteController();

