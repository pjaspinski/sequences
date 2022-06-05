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

    done();
};

export default fp(socketComms);
