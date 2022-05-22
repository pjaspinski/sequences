import { fastify } from "fastify";
import { Low } from "lowdb/lib";
import pluginSystem from "./plugin-system/pluginSystem.js";
import testRouter from "./routes/test.js";
import { Sequence } from "./sequences-storage/interfaces.js";
import sequencesStorage from "./sequences-storage/sequencesStorage.js";
import pluginsRouter from "./routes/plugins.js";
import { Plugin } from "sequences-types";

declare module "fastify" {
    export interface FastifyInstance {
        sequences: Low<Sequence>[];
        plugins: Plugin[];
    }
}

const app = fastify({ logger: true });

app.register(sequencesStorage);
app.register(pluginSystem);
app.register(testRouter);
app.register(pluginsRouter, { prefix: "/plugins" });

const start = async () => {
    try {
        await app.listen(3001);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
