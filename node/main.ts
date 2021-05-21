import { KoaServer } from "./tools/koa-server/koa-server";
import { resources, routes } from "./tools/routes/routes";

export const koaServer = new KoaServer();


koaServer.initRoutes(routes);
koaServer.initResources(resources);
