import {
    createSequence,
    deleteSequence,
    getSequences,
    updateSequence,
} from "../controllers/sequences.js";

const sequencesRouter = (fastify, options, done) => {
    fastify.get("/", getSequences);
    fastify.post("/create", createSequence);
    fastify.post("/:sequenceId/update", updateSequence);
    fastify.delete("/:sequenceId/delete", deleteSequence);

    done();
};

export default sequencesRouter;
