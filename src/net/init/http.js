import Koa from "koa";
import httpRoutes from "../../routes/http.js";

export default (emitter) => {
    const app = new Koa();

    app.use(async ctx => {
        ctx.body = 'Hello World';
        httpRoutes(ctx.request, emitter);
    });

    app.listen(3000);
}