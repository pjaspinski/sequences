export default (id: string) => {
    return fetch(`/sequences/${id}/stop`, { method: "POST" });
};
