import { Values } from "../../components/organisms/PluginSettingsModal/PluginSettingsModal";
import fetchWrapper from "../fetchWrapper";

export default (pluginId: number, settings: Values) => {
    return fetchWrapper(`/plugins/${pluginId}/restart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
    });
};
