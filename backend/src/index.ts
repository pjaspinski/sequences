import { fastify } from "fastify";
import pluginSystem from "./plugin-system/pluginSystem";
import sequencesStorage from "./sequences-storage/sequencesStorage";
import pluginsRouter from "./routes/plugins";
import SocketIO from "fastify-socket.io";
import socketComms from "./socket-comms/socketComms";
import sequencesRouter from "./routes/sequences";
import { SequencesStorage } from "./sequences-storage/interfaces";
import { SequencesPlayout } from "./sequences-playout/interfaces";
import sequencesPlayout from "./sequences-playout/sequencesPlayout";
import { SocketComms } from "./socket-comms/interfaces";
import { PluginSystem } from "./plugin-system/interfaces";

declare module "fastify" {
    export interface FastifyInstance {
        sequences: SequencesStorage;
        pluginSystem: PluginSystem;
        playout: SequencesPlayout;
        socketComms: SocketComms;
    }
}

const app = fastify({ logger: true });

app.register(sequencesStorage);
app.register(pluginSystem);
app.register(sequencesPlayout);
app.register(SocketIO, {
    serveClient: false,
});
app.register(socketComms);
app.register(pluginsRouter, { prefix: "/plugins" });
app.register(sequencesRouter, { prefix: "/sequences" });

export const start = async () => {
    try {
        await app.listen(3001);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === "dev") {
    start();
}
