export default (id: string) => {
    return fetch(`/sequences/${id}/pause`, { method: "POST" });
};
