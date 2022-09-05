export default (id: number) => {
    return fetch(`/sequences/${id}/resume`, { method: "POST" });
};
