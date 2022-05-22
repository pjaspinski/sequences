import {
    getPlugins,
    getPluginSettingFields,
    savePluginSettings,
} from "../controllers/plugins.js";

const pluginsRouter = (fastify, options, done) => {
    fastify.get("/", getPlugins);
    fastify.get("/:pluginId/settings/fields", getPluginSettingFields);
    fastify.post("/:pluginId/settings", savePluginSettings);

    done();
};

export default pluginsRouter;
