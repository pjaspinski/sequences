import { Sequence } from "sequences-types";
import fetchWrapper from "../fetchWrapper";

export default (sequence: Partial<Omit<Sequence, "id">>, id: number) => {
    return fetchWrapper(`/sequences/${id}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sequence),
    });
};
