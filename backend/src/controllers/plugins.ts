import { PluginStatus, PluginModel, Action, ActionsModel } from "sequences-types";
import _ from "lodash";

export function getPlugins(req, res) {
    const plugins: PluginModel[] = this.plugins.map((plugin) => plugin.prepareModel());
    res.send(plugins);
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

export function getActions(req, res) {
    const actions = this.plugins.reduce((acc, plugin) => {
        if (plugin.status !== PluginStatus.RUNNING) return acc;

        const actions: ActionsModel[] = plugin.actions.map((action) =>
            _.pick(action, ["name", "settingsInputs"])
        );
        return [...acc, { name: plugin.name, actions }];
    }, []);

    res.send(actions);
    return;
}
