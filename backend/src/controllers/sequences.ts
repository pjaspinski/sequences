export function getSequences(req, res) {
    res.send(this.sequences.sequences);
}

export function createSequence(req, res) {
    const { name } = req.body;
    if (!name) {
        res.statusCode = 400;
        res.send("Invalid name");
        return;
    }
    try {
        this.sequences.add(name);
    } catch (err) {
        res.statusCode = 404;
        res.send(err.message);
        return;
    }
    res.statusCode = 200;
    res.send("OK");
    return;
}

export function deleteSequence(req, res) {
    const sequenceId = parseInt(req.params.sequenceId);
    try {
        this.sequences.delete(sequenceId);
    } catch (err) {
        res.statusCode = 404;
        res.send(err.message);
        return;
    }
    res.statusCode = 200;
    res.send("OK");
    return;
}
