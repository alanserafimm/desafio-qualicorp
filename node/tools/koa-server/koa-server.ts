import Koa from 'koa';

import Body from 'koa-body';
import Logger from 'koa-logger';
import Router from 'koa-router';
import { config } from '../config/config';
import { mongoDB } from '../mongo/mongo';
import { GenericController } from '../generic/generic.controller';

const cors = require('@koa/cors');

export class KoaServer {

    private app: Koa;
    private router: Router;

    constructor() {
        this.app = module.exports = new Koa;

        this.app.listen(config.server.port, config.server.host, undefined, () => { console.log(`Server default connection open to: ${config.server.host}:${config.server.port}`) });

        this.app.use(Body());
        this.app.use(Logger());
        this.app.use(cors());


        this.app.use(async (ctx, next) => {
            try { await next() }
            catch (err) {
                ctx.status = err.status || 500;

                ctx.body = {
                    success: false,
                    message: "Erro interno. Contate o administrador do sistema!",
                    modelState: { messageBody: err.stack }
                };

                ctx.app.emit('error', err, ctx);
            }
        });

        mongoDB.init();

        this.router = new Router();
    };

    public initRoutes(controllers: GenericController<any>[]) {

        for (let controller of controllers) controller.applyRoutes(this.router);

        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());

        console.log(this.router.stack.map((i: any) => i.path));
    };

    public async initResources(resources: any[]) {
        for (var resource of resources) {
            await resource.register();
        };
    };

};