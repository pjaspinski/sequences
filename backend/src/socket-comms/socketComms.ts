import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { PluginStatusChangedPayload } from "sequences-types";

const socketComms = async (fastify: FastifyInstance, options, done) => {
    fastify.io.on("connection", () => {
        fastify.plugins.forEach((plugin) => {
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
