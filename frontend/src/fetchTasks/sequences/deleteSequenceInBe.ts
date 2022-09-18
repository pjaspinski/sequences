import fetchWrapper from "../fetchWrapper";

export default (id: string) => {
    return fetchWrapper(`/sequences/${id}/delete`, {
        method: "DELETE",
    });
};
