export default (id: number) => {
    return fetch(`/sequences/${id}/play`, { method: "POST" });
};
