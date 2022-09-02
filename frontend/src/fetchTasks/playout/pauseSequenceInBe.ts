export default (id: number) => {
    return fetch(`/sequences/${id}/pause`, { method: "POST" }).then((res) => res.text());
};
