import { createSequence, deleteSequence, getSequences } from "../controllers/sequences.js";

const sequencesRouter = (fastify, options, done) => {
    fastify.get("/", getSequences);
    fastify.post("/create", createSequence);
    fastify.post("/:sequenceId/delete", deleteSequence);

    done();
};

export default sequencesRouter;
