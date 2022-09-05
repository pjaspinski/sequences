import fetchWrapper from "./fetchWrapper";

export default (id: number) => {
    return fetchWrapper(`/sequences/${id}/delete`, {
        method: "DELETE",
    });
};
