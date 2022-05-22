export function getPlugins(req, res) {
    res.send(this.plugins);
}

export function getPluginSettingFields(req, res) {
    const pluginId = parseInt(req.params.pluginId);
    const plugin = this.plugins.find((p) => p.id === pluginId);
    if (plugin) {
        res.send(plugin.settingsFields);
        return;
    }
    res.statusCode = 404;
    res.send(`Plugin with id ${pluginId} does not exist`);
}

export function savePluginSettings(req, res) {
    const pluginId = parseInt(req.params.pluginId);
    const plugin = this.plugins.find((p) => p.id === pluginId);
    if (plugin) {
        res.send("Success");
        console.log(req.body);
        return;
    }
    res.statusCode = 404;
    res.send(`Plugin with id ${pluginId} does not exist`);
}
