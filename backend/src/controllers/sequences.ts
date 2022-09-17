export function getSequences(req, res) {
    try {
        res.send(this.sequences.getAll());
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to fetch sequences.");
        return;
    }
}

export function createSequence(req, res) {
    const { name, pluginId } = req.body;
    if (!name || pluginId === undefined) {
        res.statusCode = 400;
        res.send("Failed to create sequence.");
        return;
    }
    this.sequences
        .add(name, pluginId)
        .then(() => {
            res.statusCode = 200;
            res.send("OK");
        })
        .catch(() => {
            res.statusCode = 404;
            res.send("Failed to create sequence.");
            return;
        });
}

export function deleteSequence(req, res) {
    const sequenceId = req.params.sequenceId;
    try {
        this.sequences.remove(sequenceId);
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to delete sequence.");
        return;
    }
    res.statusCode = 200;
    res.send("OK");
    return;
}

export function updateSequence(req, res) {
    const sequenceId = req.params.sequenceId;
    const sequence = req.body;
    try {
        this.sequences.update(sequenceId, sequence).then((sequence) => res.send(sequence));
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to update sequence.");
    }
}

export function playSequence(req, res) {
    const sequenceId = req.params.sequenceId;
    try {
        this.playout.play(sequenceId);
        res.send("Success");
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to play sequence.");
    }
}

export function pauseSequence(req, res) {
    const sequenceId = req.params.sequenceId;
    try {
        this.playout.pause(sequenceId);
        res.send("Success");
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to pause sequence.");
    }
}

export function resumeSequence(req, res) {
    const sequenceId = req.params.sequenceId;
    try {
        this.playout.resume(sequenceId);
        res.send("Success");
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to resume sequence.");
    }
}

export function stopSequence(req, res) {
    const sequenceId = req.params.sequenceId;
    try {
        this.playout.stop(sequenceId);
        res.send("Success");
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to stop sequence.");
    }
}

export function restartSequence(req, res) {
    const sequenceId = req.params.sequenceId;
    try {
        this.playout.restart(sequenceId);
        res.send("Success");
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to restart sequence.");
    }
}
