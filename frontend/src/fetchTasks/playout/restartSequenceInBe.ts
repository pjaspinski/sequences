export default (id: string) => {
    return fetch(`/sequences/${id}/restart`, { method: "POST" });
};
