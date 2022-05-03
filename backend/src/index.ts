import { fastify } from "fastify";
import localDbsLoader from "./local-dbs/loader.js";
import testRouter from "./routes/test.js";

// Declaration merging
declare module "fastify" {
    export interface FastifyInstance {
        localDbs: any;
    }
}

const app = fastify({ logger: true });

app.register(localDbsLoader);
app.register(testRouter);

const start = async () => {
    try {
        await app.listen(3000);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
