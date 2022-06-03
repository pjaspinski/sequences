import { PluginStatus } from "sequences-types";

export function getPlugins(req, res) {
    res.send(this.plugins);
}

export function getPluginSettingFields(req, res) {
    const pluginId = parseInt(req.params.pluginId);
    const plugin = this.plugins.find((p) => p.id === pluginId);
    if (plugin) {
        res.send(plugin.settingInputs);
        return;
    }
    res.statusCode = 404;
    res.send(`Plugin with id ${pluginId} does not exist`);
}

export function savePluginSettings(req, res) {
    const pluginId = parseInt(req.params.pluginId);
    const plugin = this.plugins.find((p) => p.id === pluginId);
    if (plugin) {
        plugin.setStatus(PluginStatus.LOADING);
        plugin.setup(req.body);
        res.send("Success");
        return;
    }
    res.statusCode = 404;
    res.send(`Plugin with id ${pluginId} does not exist`);
}
