import {
    getActions,
    getPlugins,
    getPluginSettingFields,
    removePlugin,
    restartPlugin,
    savePluginSettings,
    stopPlugin,
} from "../controllers/plugins.js";

const pluginsRouter = (fastify, options, done) => {
    fastify.get("/", getPlugins);
    fastify.get("/:pluginId/settings/fields", getPluginSettingFields);
    fastify.post("/:pluginId/settings", savePluginSettings);
    fastify.get("/actions", getActions);
    fastify.post("/:pluginId/stop", stopPlugin);
    fastify.post("/:pluginId/restart", restartPlugin);
    fastify.delete("/:pluginId/remove", removePlugin);

    done();
};

export default pluginsRouter;
