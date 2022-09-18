import { FastifyPluginCallback } from "fastify";
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
} from "../controllers/sequences";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SequencesRouterOptions {}

const sequencesRouter: FastifyPluginCallback<SequencesRouterOptions> = (
    fastify,
    _options,
    done
) => {
    fastify.get("/", getSequences);
    fastify.post("/create", createSequence);
    fastify.post("/:sequenceId/update", updateSequence);
    fastify.delete("/:sequenceId/delete", deleteSequence);
    fastify.post("/:sequenceId/play", playSequence);
    fastify.post("/:sequenceId/stop", stopSequence);
    fastify.post("/:sequenceId/pause", pauseSequence);
    fastify.post("/:sequenceId/resume", resumeSequence);
    fastify.post("/:sequenceId/restart", restartSequence);

    done();
};

export default sequencesRouter;
