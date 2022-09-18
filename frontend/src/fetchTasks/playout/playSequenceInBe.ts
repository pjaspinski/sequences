export default (id: string) => {
    return fetch(`/sequences/${id}/play`, { method: "POST" });
};
