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
    fastify.io.on("connection", () => {
        fastify.pluginSystem.plugins.forEach((plugin) => {
            plugin.on("pluginStatusChange", (payload: PluginStatusChangedPayload) => {
                fastify.io.emit("pluginStatusChange", payload);
            });
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
