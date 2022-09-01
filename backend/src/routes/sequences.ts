import {
    createSequence,
    deleteSequence,
    getSequences,
    pauseSequence,
    playSequence,
    restartSequence,
    resumeSequence,
    stopSequence,
    updateSequence,
} from "../controllers/sequences.js";

const sequencesRouter = (fastify, options, done) => {
    fastify.get("/", getSequences);
    fastify.post("/create", createSequence);
    fastify.post("/:sequenceId/update", updateSequence);
    fastify.delete("/:sequenceId/delete", deleteSequence);
    fastify.post("/:sequenceId/play", playSequence);
    fastify.post("/:sequenceId/stop", stopSequence);
    fastify.post("/:sequenceId/pause", pauseSequence);
    fastify.post("/:sequenceId/resue", resumeSequence);
    fastify.post("/:sequenceId/restart", restartSequence);

    done();
};

export default sequencesRouter;
