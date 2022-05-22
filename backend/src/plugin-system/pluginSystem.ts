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
    const imports = await Promise.all<{ default: PluginDefinition }>(
        pluginNames.map((name: string) => import(name))
    );

    const plugins = imports.map<Plugin>((plugin, idx) => ({
        ...plugin.default,
        id: idx,
        status: "DISABLED",
        active: false,
    }));

    fastify.decorate("plugins", plugins);

    done();
};

export default fp(pluginSystem);
