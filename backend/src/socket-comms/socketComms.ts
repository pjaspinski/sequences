import fp from "fastify-plugin";
import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { PluginStatusChangedPayload } from "sequences-types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SocketCommsOptions {}

const socketComms: FastifyPluginCallback<SocketCommsOptions> = async (
    fastify: FastifyInstance,
    _options,
    done
) => {
    fastify.io.on("connection", (socket) => {
        fastify.pluginSystem.plugins.forEach((plugin) => {
            plugin.on("pluginStatusChange", (payload: PluginStatusChangedPayload) => {
                fastify.io.emit("pluginStatusChange", payload);
            });
        });

        socket.on("getSequences", () => {
            console.log("getSequences");
            const sequences = fastify.sequences.getAll();
            fastify.io.emit("sequences", sequences);
        });

        socket.on("playPause", (sequenceId: string) => {
            const sequence = fastify.sequences.getById(sequenceId);
            if (sequence) {
                const status = fastify.playout.getStatus(sequenceId, 0);
                if (status.state === "STOPPED") {
                    fastify.playout.play(sequenceId);
                    return;
                }
                if (status.state === "RUNNING") {
                    fastify.playout.pause(sequenceId);
                    return;
                }
                if (status.state === "PAUSED") {
                    fastify.playout.resume(sequenceId);
                    return;
                }
            }
        });

        socket.on("stop", (sequenceId: string) => {
            const sequence = fastify.sequences.getById(sequenceId);
            if (sequence) {
                const status = fastify.playout.getStatus(sequenceId, 0);
                if (["RUNNING", "PAUSED"].includes(status.state)) {
                    fastify.playout.stop(sequenceId);
                }
            }
        });

        socket.on("restart", (sequenceId: string) => {
            const sequence = fastify.sequences.getById(sequenceId);
            if (sequence) {
                const status = fastify.playout.getStatus(sequenceId, 0);
                if (["RUNNING", "PAUSED"].includes(status.state)) {
                    fastify.playout.restart(sequenceId);
                }
            }
        });
    });

    const emit = (topic: string, payload: any) => {
        console.log(`emitting ${topic} with ${payload}`);
        fastify.io.emit(topic, payload);
    };

    fastify.decorate("socketComms", { emit });

    done();
};

export default fp(socketComms);
