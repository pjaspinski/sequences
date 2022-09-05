export default (id: number) => {
    return fetch(`/sequences/${id}/pause`, { method: "POST" });
};
