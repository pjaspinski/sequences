import { SequenceCreateInit } from "../store/sequences/sequences.actions";

export default (payload: SequenceCreateInit["payload"]) => {
    return fetch("/sequences/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    }).then((res) => res.text());
};
