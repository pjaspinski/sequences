export default (id: number) => {
    return fetch(`/sequences/${id}/stop`, { method: "POST" }).then((res) => res.text());
};
