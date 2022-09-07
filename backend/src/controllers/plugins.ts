export function getPlugins(req, res) {
    try {
        res.send(this.plugins.getAll());
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to fetch plugins.");
        return;
    }
}

export function getPluginSettingFields(req, res) {
    try {
        const pluginId = parseInt(req.params.pluginId);
        res.send(this.plugins.getSettings(pluginId));
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to fetch setting fields.");
        return;
    }
}

export function savePluginSettings(req, res) {
    try {
        const pluginId = parseInt(req.params.pluginId);
        this.plugins.setup(pluginId, req.body);
        res.send("Success");
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to setup plugin.");
        return;
    }
}

export function getActions(req, res) {
    try {
        res.send(this.plugins.getActions());
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to fetch actions.");
        return;
    }
}

export function stopPlugin(req, res) {
    try {
        const pluginId = parseInt(req.params.pluginId);
        this.plugins.stop(pluginId);
        res.send("Success");
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to stop plugin.");
        return;
    }
}

export function restartPlugin(req, res) {
    try {
        const pluginId = parseInt(req.params.pluginId);
        this.plugins.stop(pluginId);
        res.send("Success");
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to restart plugin.");
        return;
    }
}
