import fetchWrapper from "../fetchWrapper";

export default (pluginId: number) => {
    return fetchWrapper(`/plugins/${pluginId}/stop`, {
        method: "POST",
    });
};
