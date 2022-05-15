import { join, dirname } from "path";
import fp from "fastify-plugin";
import { readdirSync } from "node:fs";
import { FastifyInstance } from "fastify";
import { Plugin } from "sequences-types";

const getPlugins = () => {
    return readdirSync(join(dirname("."), "node_modules")).filter((name) =>
        name.startsWith("sequences-plugin-")
    );
};

const pluginSystem = async (fastify: FastifyInstance, options, done) => {
    const pluginNames = getPlugins();

    const plugins = await Promise.all<Plugin>(
        pluginNames.map((name: string) => import(name))
    );

    fastify.decorate("plugins", plugins);

    done();
};

export default fp(pluginSystem);
