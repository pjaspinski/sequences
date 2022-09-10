import { Action, Input, PluginModel, PluginSettings, PluginTemplate } from "sequences-types";

export interface PluginSystem {
    getAll: () => PluginModel[];
    getSettings: (pluginId: number) => Input[];
    setup: (pluginId: number, options: PluginSettings) => void;
    stop: (pluginId: number) => void;
    restart: (pluginId: number, options: PluginSettings) => void;
    remove: (pluginId: number) => void;
    getActions: () => Action[];
    plugins: PluginTemplate[];
}
