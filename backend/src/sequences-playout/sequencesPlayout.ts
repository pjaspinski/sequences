import fp from "fastify-plugin";
import { SequencesPlayout } from "./interfaces";
import { Worker } from "node:worker_threads";
import { FastifyInstance } from "fastify";

const playoutWorkers: { [key: string]: Worker } = {};

const sequencesPlayout = async (fastify: FastifyInstance, options, done) => {
    const play = async (sequenceId: number) => {
        const sequence = fastify.sequences.getById(sequenceId);

        if (!sequence) {
            throw new Error(`Sequence with id ${sequenceId} not found`);
        }
        if (!sequence.actions.length) return;

        const plugin = fastify.plugins.find((p) => p.id === sequence.pluginId);
        if (!sequence) {
            throw new Error(`Plugin with id ${sequence.pluginId} not found`);
        }

        const sequenceDelays = sequence.actions.map((action) => action.delay);
        playoutWorkers[sequence.id] = new Worker("./src/sequences-playout/worker/worker.js", {
            workerData: { delays: sequenceDelays },
        });

        playoutWorkers[sequence.id].on("message", (idx: number) => {
            console.log("messagge", idx);
            plugin.handleAction(sequence.actions[idx]);
        });

        playoutWorkers[sequence.id].on("exit", (exitCode) => {
            console.log(`It exited with code ${exitCode}`);
            playoutWorkers[sequence.id] = undefined;
        });
    };

    const sequencesPlayout: SequencesPlayout = { play };

    fastify.decorate("playout", sequencesPlayout);

    done();
};

export default fp(sequencesPlayout);
