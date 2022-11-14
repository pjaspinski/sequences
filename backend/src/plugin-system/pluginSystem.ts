import { join, dirname } from "path";
import fp from "fastify-plugin";
import { readdirSync } from "node:fs";
import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { Action, PluginSettings, PluginTemplate } from "sequences-types";
import { PluginSystem } from "./interfaces";
import _ from "lodash";
import persistentStorage from "node-persist";
import { homedir } from "os";

const STORAGE_PATH = "Documents/plugins";
const storageDir = join(homedir(), STORAGE_PATH);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PluginSystemOptions {}

const getPluginsNames = () => {
    let names = readdirSync(join(dirname("."), "node_modules"))
        .filter((name) => name.startsWith("sequences-plugin-"))
        .map((name) => name.replace("sequences-plugin-", ""));

    if (process.argv[2] !== "test") names = names.filter((name) => name !== "test");
    return names;
};

const pluginSystem: FastifyPluginCallback<PluginSystemOptions> = async (
    fastify: FastifyInstance,
    _options,
    done
) => {
    const pluginNames = getPluginsNames();
    const imports = await Promise.all<{ default: new (id: number) => PluginTemplate }>(
        pluginNames.map(
            (name: string) => import(`../../node_modules/sequences-plugin-${name}/dist/index.js`)
        )
    );

    const plugins = imports.map<PluginTemplate>((plugin) => new plugin.default(0)); // idk why this id has to be here
    await persistentStorage.init({
        dir: storageDir,
    });

    const setup = async (pluginId: number, options: PluginSettings) => {
        const plugin = plugins.find((p) => p.id === pluginId);
        if (plugin) {
            await persistentStorage.setItem(pluginId.toString(), options);
            plugin.lastSettings = options;
            plugin.setStatus("LOADING");
            plugin.setup(options);
            return;
        }
        throw new Error("Plugin not found");
    };

    const startPlugins = async () => {
        plugins.forEach(async (plugin) => {
            const options = await persistentStorage.getItem(plugin.id.toString());
            if (options) setup(plugin.id, options);
        });
    };

    startPlugins();

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

    const remove = async (pluginId: number) => {
        const plugin = plugins.find((p) => p.id === pluginId);
        if (plugin && plugin.getStatus() !== "REMOVED") {
            await persistentStorage.removeItem(pluginId.toString());
            plugin.getStatus() !== "DISABLED" && plugin.destroy();
            plugin.lastSettings = undefined;
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
