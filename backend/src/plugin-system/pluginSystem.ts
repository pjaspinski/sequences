import { join, dirname } from "path";
import fp from "fastify-plugin";
import { readdirSync } from "node:fs";
import { FastifyInstance } from "fastify";
import { Plugin, PluginDefinition } from "sequences-types";

const getPlugins = () => {
    return readdirSync(join(dirname("."), "node_modules")).filter((name) =>
        name.startsWith("sequences-plugin-")
    );
};

const pluginSystem = async (fastify: FastifyInstance, options, done) => {
    const pluginNames = getPlugins();

    let plugins = await Promise.all<PluginDefinition>(
        pluginNames.map((name: string) => import(name))
    );

    plugins = plugins.map<Plugin>((plugin, idx) => ({ ...plugin, id: idx }));

    fastify.decorate("plugins", plugins);

    done();
};

export default fp(pluginSystem);
