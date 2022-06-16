export function getSequences(req, res) {
    res.send(this.sequences.getAll());
}

export function createSequence(req, res) {
    const { name, pluginId } = req.body;
    if (!name || pluginId === undefined) {
        res.statusCode = 400;
        res.send("Invalid body.");
        return;
    }
    try {
        this.sequences.add(name, pluginId);
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

export function updateSequence(req, res) {
    const sequenceId = parseInt(req.params.sequenceId);
    const sequence = req.body;
    try {
        this.sequences.update(sequenceId, sequence).then((sequence) => res.send(sequence));
    } catch (err) {
        res.statusCode = 404;
        res.send(err.message);
        return;
    }
}

export function playSequence(req, res) {
    const sequenceId = parseInt(req.params.sequenceId);
    try {
        this.playout.play(sequenceId);
    } catch (err) {
        res.statusCode = 404;
        res.send(err.message);
        return;
    }
}
