import { Values } from "../components/organisms/PluginSettingsModal/PluginSettingsModal";

export default (pluginId: number, settings: Values) => {
    return fetch(`/plugins/${pluginId}/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
    }).then((res) => res.text());
};
