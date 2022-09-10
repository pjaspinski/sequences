import { SequenceCreateInit } from "../../store/sequences/sequences.actions";
import fetchWrapper from "../fetchWrapper";

export default (payload: SequenceCreateInit["payload"]) => {
    return fetchWrapper("/sequences/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
};
