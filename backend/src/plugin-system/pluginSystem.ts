import { join, dirname } from "path";
import fp from "fastify-plugin";
import { readdirSync } from "node:fs";
import { FastifyInstance } from "fastify";
import { Action, PluginSettings, PluginTemplate } from "sequences-types";
import { PluginSystem } from "./interfaces";
import _ from "lodash";

const getPlugins = () => {
    return readdirSync(join(dirname("."), "node_modules")).filter((name) =>
        name.startsWith("sequences-plugin-")
    );
};

const pluginSystem = async (fastify: FastifyInstance, options, done) => {
    const pluginNames = getPlugins();
    const settings: { [key: number]: PluginSettings } = {};
    const imports = await Promise.all<{
        default: new (id: number) => PluginTemplate;
    }>(pluginNames.map((name: string) => import(name)));

    const plugins = imports.map<PluginTemplate>((plugin) => new plugin.default(0)); // idk why this id has to be here

    const getAll = () => {
        return plugins.map((plugin) => plugin.prepareModel());
    };

    const getSettings = (pluginId: number) => {
        const plugin = plugins.find((p) => p.id === pluginId);
        if (plugin) {
            return plugin.settingsInputs;
        }
        throw new Error("Plugin not found");
    };

    const setup = (pluginId: number, options: PluginSettings) => {
        const plugin = plugins.find((p) => p.id === pluginId);
        if (plugin) {
            settings[pluginId] = options;
            plugin.setStatus("LOADING");
            plugin.setup(options);
            return;
        }
        throw new Error("Plugin not found");
    };

    const stop = (pluginId: number) => {
        const plugin = plugins.find((p) => p.id === pluginId);
        if (plugin && plugin.getStatus() === "RUNNING") {
            plugin.destroy();
            plugin.setStatus("DISABLED");
            return;
        }
        throw new Error("Plugin not found or not running");
    };

    const restart = (pluginId: number, options: PluginSettings) => {
        const plugin = plugins.find((p) => p.id === pluginId);
        if (plugin) {
            plugin.getStatus() === "RUNNING" && stop(pluginId);
            setup(pluginId, options);
            return;
        }
        throw new Error("Plugin not found");
    };

    const getActions = () => {
        const actions = plugins.reduce((acc, plugin) => {
            if (plugin.getStatus() !== "RUNNING") return acc;

            const actions: Action[] = plugin
                .getActions()
                .map((action) => _.pick(action, ["id", "name", "settingsInputs"]));
            return [...acc, { name: plugin.name, actions }];
        }, []);

        return actions;
    };

    const remove = (pluginId: number) => {
        const plugin = plugins.find((p) => p.id === pluginId);
        if (plugin && plugin.getStatus() !== "REMOVED") {
            plugin.getStatus() !== "DISABLED" && plugin.destroy();
            plugin.setStatus("REMOVED");
            return;
        }
        throw new Error("Plugin not found or already removed");
    };

    const pluginSystem: PluginSystem = {
        getAll,
        getSettings,
        setup,
        stop,
        restart,
        getActions,
        plugins,
        remove,
    };

    fastify.decorate("pluginSystem", pluginSystem);

    done();
};

export default fp(pluginSystem);
