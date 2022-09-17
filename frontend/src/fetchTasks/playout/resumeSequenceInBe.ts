export default (id: string) => {
    return fetch(`/sequences/${id}/resume`, { method: "POST" });
};
