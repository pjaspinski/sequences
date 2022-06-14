import { fastify } from "fastify";
import pluginSystem from "./plugin-system/pluginSystem.js";
import testRouter from "./routes/test.js";
import sequencesStorage from "./sequences-storage/sequencesStorage.js";
import pluginsRouter from "./routes/plugins.js";
import { PluginTemplate } from "sequences-types";
import SocketIO from "fastify-socket.io";
import socketComms from "./socket-comms/socketComms.js";
import sequencesRouter from "./routes/sequences.js";
import { SequencesStorage } from "./sequences-storage/interfaces.js";

declare module "fastify" {
    export interface FastifyInstance {
        sequences: SequencesStorage;
        plugins: PluginTemplate[];
    }
}

const app = fastify({ logger: true });

app.register(sequencesStorage);
app.register(pluginSystem);
app.register(SocketIO, {
    serveClient: false,
});
app.register(socketComms);
app.register(testRouter);
app.register(pluginsRouter, { prefix: "/plugins" });
app.register(sequencesRouter, { prefix: "/sequences" });

const start = async () => {
    try {
        await app.listen(3001);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
