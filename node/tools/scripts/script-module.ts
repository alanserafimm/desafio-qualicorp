import fs from 'fs';


var directory = 'cliente';  // Nome do diretorio exemple: .modules/exemple
var name = 'clientetelefoneservices'; // Nome do arquivos 'controller,models,services' exemple: .modules/exemple.controller.ts


var dir = `./modules/${directory}`;
var controller = `./modules/${directory}/controllers`;
var models = `./modules/${directory}/models`;
var services = `./modules/${directory}/services`;

//#region PASTE

if (!fs.existsSync(dir)) { fs.mkdirSync(dir); };

if (!fs.existsSync(models)) { fs.mkdirSync(models); };

if (!fs.existsSync(services)) { fs.mkdirSync(services); };

if (!fs.existsSync(controller)) { fs.mkdirSync(controller); };

//#endregion

//#region FILES

if (!fs.existsSync(models + "/" + name + ".models.ts")) {

    var textModel = `
    import { IModelo } from "../../../tools/generic/generic.interfaces";

    export const API${capitalizeFirstLetter(name)} = "${name}";

    export interface I${capitalizeFirstLetter(name)} extends IModelo {

    };

    `;

    fs.writeFile(`${models}/${name}.models.ts`, textModel, function (err) { });
};

if (!fs.existsSync(services + "/" + name + ".services.ts")) {
    var textService = `
    import { GenericServices } from "../../../tools/generic/generic.services";
    import { API${capitalizeFirstLetter(name)}, I${capitalizeFirstLetter(name)} } from "../models/${name}.models";
    import { ObjectId } from 'mongodb';

      export class ${capitalizeFirstLetter(name)}Services extends GenericServices<I${capitalizeFirstLetter(name)}> {

      public api: string = API${capitalizeFirstLetter(name)};

         constructor() {
             super();
             super.api = this.api;
         };

      }`;

    fs.writeFile(`${services}/${name}.services.ts`, textService, function (err) { });
};

if (!fs.existsSync(controller + "/" + name + ".controllers.ts")) {
    var textController = `
    import Router from "koa-router";

    import { GenericController } from "../../../tools/generic/generic.controller";
    import { API${capitalizeFirstLetter(name)}, I${capitalizeFirstLetter(name)} } from "../models/${name}.models";
    import { ${capitalizeFirstLetter(name)}Services } from "../services/${name}.services";

    export class ${capitalizeFirstLetter(name)}Controller extends GenericController<I${capitalizeFirstLetter(name)}> {
         public api: string = API${capitalizeFirstLetter(name)};

         service: ${capitalizeFirstLetter(name)}Services;

         constructor() {
           super();
           this.service = new ${capitalizeFirstLetter(name)}Services();
         };

     public applyRoutes(koaRouter: Router) {

          super.applyRoutes(koaRouter);
     };

    };

    export const ${name}Controller = new ${capitalizeFirstLetter(name)}Controller();

`;

    fs.writeFile(`${controller}/${name}.controller.ts`, textController, function (err) { });
};

//#endregion


function capitalizeFirstLetter(string: string) { return string.charAt(0).toUpperCase() + string.slice(1); }


