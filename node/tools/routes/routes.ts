import { clienteController } from "../../modules/cliente/controllers/cliente.controller";
import { clienteTelefoneController } from "../../modules/cliente/controllers/clientetelefone.controller";
import { clienteResources } from "../../modules/cliente/resources/cliente.resources";
import { clienteTelefoneResources } from "../../modules/cliente/resources/clientetelefone.resources";

export const routes = [
    clienteController,
    clienteTelefoneController
];

export const resources = [
    clienteResources,
    clienteTelefoneResources
];