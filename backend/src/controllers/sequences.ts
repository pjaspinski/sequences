import { FastifyReply, FastifyRequest, RequestGenericInterface } from "fastify";
import { Sequence } from "sequences-types";

export function getSequences(_req: FastifyRequest, res: FastifyReply) {
    try {
        res.send(this.sequences.getAll());
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to fetch sequences.");
        return;
    }
}

interface CreateSequenceRequest extends RequestGenericInterface {
    Body: {
        name: string;
        pluginId: number;
    };
}

export function createSequence(req: FastifyRequest<CreateSequenceRequest>, res: FastifyReply) {
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

interface SequenceRequest extends RequestGenericInterface {
    Params: {
        sequenceId: string;
    };
}

type SequenceIdRequest = FastifyRequest<SequenceRequest>;

export function deleteSequence(req: SequenceIdRequest, res: FastifyReply) {
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

export function updateSequence(req: SequenceIdRequest, res: FastifyReply) {
    const sequenceId = req.params.sequenceId;
    const sequence = req.body;
    try {
        this.sequences
            .update(sequenceId, sequence)
            .then((sequence: Sequence) => res.send(sequence));
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to update sequence.");
    }
}

export function playSequence(req: SequenceIdRequest, res: FastifyReply) {
    const sequenceId = req.params.sequenceId;
    try {
        this.playout.play(sequenceId);
        res.send("Success");
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to play sequence.");
    }
}

export function pauseSequence(req: SequenceIdRequest, res: FastifyReply) {
    const sequenceId = req.params.sequenceId;
    try {
        this.playout.pause(sequenceId);
        res.send("Success");
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to pause sequence.");
    }
}

export function resumeSequence(req: SequenceIdRequest, res: FastifyReply) {
    const sequenceId = req.params.sequenceId;
    try {
        this.playout.resume(sequenceId);
        res.send("Success");
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to resume sequence.");
    }
}

export function stopSequence(req: SequenceIdRequest, res: FastifyReply) {
    const sequenceId = req.params.sequenceId;
    try {
        this.playout.stop(sequenceId);
        res.send("Success");
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to stop sequence.");
    }
}

export function restartSequence(req: SequenceIdRequest, res: FastifyReply) {
    const sequenceId = req.params.sequenceId;
    try {
        this.playout.restart(sequenceId);
        res.send("Success");
    } catch (err) {
        res.statusCode = 404;
        res.send("Failed to restart sequence.");
    }
}
