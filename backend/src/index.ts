import { fastify } from "fastify";
import pluginSystem from "./plugin-system/pluginSystem.js";
import testRouter from "./routes/test.js";
import sequencesStorage from "./sequences-storage/sequencesStorage.js";
import pluginsRouter from "./routes/plugins.js";
import SocketIO from "fastify-socket.io";
import socketComms from "./socket-comms/socketComms.js";
import sequencesRouter from "./routes/sequences.js";
import { SequencesStorage } from "./sequences-storage/interfaces.js";
import { SequencesPlayout } from "./sequences-playout/interfaces.js";
import sequencesPlayout from "./sequences-playout/sequencesPlayout.js";
import { SocketComms } from "./socket-comms/interfaces.js";
import { PluginSystem } from "./plugin-system/interfaces.js";

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
app.register(testRouter);
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

start();

// if (require.main === module) {
//     console.log("start");
//     start();
// }
