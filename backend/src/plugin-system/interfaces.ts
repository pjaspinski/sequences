import { Action, Input, PluginModel, PluginSettings } from "sequences-types";

export interface PluginSystem {
    getAll: () => PluginModel[];
    getSettings: (pluginId: number) => Input[];
    setup: (pluginId: number, options: PluginSettings) => void;
    stop: (pluginId: number) => void;
    restart: (pluginId: number) => void;
    getActions: () => Action[];
}
