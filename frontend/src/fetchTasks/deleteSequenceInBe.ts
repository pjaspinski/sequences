export default (id: number) => {
    return fetch(`/sequences/${id}/delete`, {
        method: "DELETE",
    }).then((res) => res.text());
};
