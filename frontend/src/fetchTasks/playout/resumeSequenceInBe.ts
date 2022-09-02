export default (id: number) => {
    return fetch(`/sequences/${id}/resume`, { method: "POST" }).then((res) => res.text());
};
