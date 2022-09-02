import fp from "fastify-plugin";
import { SequencesPlayout } from "./interfaces";
import { Worker } from "node:worker_threads";
import { FastifyInstance } from "fastify";

interface PlayoutWorker {
    worker: Worker;
    status: PlayoutStatus;
}

interface PlayoutStatus {
    state: "RUNNING" | "PAUSED";
    current: number;
    total: number;
}

const playoutWorkers: { [key: string]: PlayoutWorker } = {};

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
        const worker = new Worker("./src/sequences-playout/worker/worker.js", {
            workerData: { delays: sequenceDelays },
        });

        worker.on("message", (idx: number) => {
            plugin.handleAction(sequence.actions[idx]);
        });

        worker.on("exit", (exitCode) => {
            playoutWorkers[sequence.id] = undefined;
        });
    };

    const stop = (sequenceId: number) => {
        const playoutWorker = playoutWorkers[sequenceId];

        if (!playoutWorker) {
            throw new Error(`Sequence with id ${sequenceId} is not played right now`);
        }

        playoutWorker.worker.terminate();
        playoutWorkers[sequenceId] = undefined;
    };

    const pause = (sequenceId: number) => {
        const worker = playoutWorkers[sequenceId];

        if (!worker || worker.status.state !== "RUNNING") {
            throw new Error(`Sequence with id ${sequenceId} is not played right now`);
        }

        worker.worker.postMessage("pause");
        worker.status.state = "PAUSED";
    };

    const resume = (sequenceId: number) => {
        const worker = playoutWorkers[sequenceId];

        if (!worker || worker.status.state !== "PAUSED") {
            throw new Error(`Sequence with id ${sequenceId} does not exist or is not paused`);
        }

        worker.worker.postMessage("resume");
        worker.status.state = "RUNNING";
    };

    const restart = (sequenceId: number) => {
        stop(sequenceId);
        play(sequenceId);
    };

    const sequencesPlayout: SequencesPlayout = { play, stop, pause, resume, restart };

    fastify.decorate("playout", sequencesPlayout);

    done();
};

export default fp(sequencesPlayout);
