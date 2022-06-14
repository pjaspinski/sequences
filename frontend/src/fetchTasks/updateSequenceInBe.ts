import { Sequence } from "sequences-types";

export default (sequence: Partial<Omit<Sequence, "id">>, id: number) => {
    return fetch(`/sequences/${id}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sequence),
    }).then((res) => res.json());
};
