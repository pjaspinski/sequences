import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";

const socketComms = async (fastify: FastifyInstance, options, done) => {
    fastify.io.on("connection", () => {
        console.log("Client connected using SocketIO.");
    });

    done();
};

export default fp(socketComms);
