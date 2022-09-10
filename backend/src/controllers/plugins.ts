export function getPlugins(req, res) {
    try {
        res.send(this.pluginSystem.getAll());
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to fetch plugins.");
        return;
    }
}

export function getPluginSettingFields(req, res) {
    try {
        const pluginId = parseInt(req.params.pluginId);
        res.send(this.pluginSystem.getSettings(pluginId));
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to fetch setting fields.");
        return;
    }
}

export function savePluginSettings(req, res) {
    try {
        const pluginId = parseInt(req.params.pluginId);
        this.pluginSystem.setup(pluginId, req.body);
        res.send("Success");
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to setup plugin.");
        return;
    }
}

export function getActions(req, res) {
    try {
        res.send(this.pluginSystem.getActions());
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to fetch actions.");
        return;
    }
}

export function stopPlugin(req, res) {
    try {
        const pluginId = parseInt(req.params.pluginId);
        this.pluginSystem.stop(pluginId);
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
        this.pluginSystem.restart(pluginId, req.body);
        res.send("Success");
    } catch (err) {
        console.log(err);
        res.statusCode = 404;
        res.send("Failed to restart plugin.");
        return;
    }
}

export function removePlugin(req, res) {
    try {
        const pluginId = parseInt(req.params.pluginId);
        this.pluginSystem.remove(pluginId);
        res.send("Success");
    } catch (err) {
        console.log(err);
        res.statusCode = 404;
        res.send("Failed to remove plugin.");
        return;
    }
}
