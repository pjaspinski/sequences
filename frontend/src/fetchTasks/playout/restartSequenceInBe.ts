export default (id: number) => {
    return fetch(`/sequences/${id}/restart`, { method: "POST" });
};
