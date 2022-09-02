import fp from "fastify-plugin";
import { SequencesPlayout } from "./interfaces";
import { Worker } from "node:worker_threads";
import { FastifyInstance } from "fastify";
import { PlayoutStatus, PlayoutWorker, Sequence } from "sequences-types";

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
            playoutWorkers[sequence.id].status.current += 1;
            emitUpdate(sequence.id);
        });

        worker.on("exit", (exitCode) => {
            playoutWorkers[sequence.id] = undefined;
            emitUpdate(sequence.id);
        });

        playoutWorkers[sequence.id] = {
            worker,
            status: { state: "RUNNING", current: 0, total: sequence.actions.length },
        };
        emitUpdate(sequence.id);
    };

    const stop = (sequenceId: number) => {
        const playoutWorker = playoutWorkers[sequenceId];

        if (!playoutWorker) {
            throw new Error(`Sequence with id ${sequenceId} is not played right now`);
        }

        playoutWorker.worker.terminate();
        playoutWorkers[sequenceId] = undefined;
        emitUpdate(sequenceId);
    };

    const pause = (sequenceId: number) => {
        const worker = playoutWorkers[sequenceId];

        if (!worker || worker.status.state !== "RUNNING") {
            throw new Error(`Sequence with id ${sequenceId} is not played right now`);
        }

        worker.worker.postMessage("pause");
        worker.status.state = "PAUSED";
        emitUpdate(sequenceId);
    };

    const resume = (sequenceId: number) => {
        const worker = playoutWorkers[sequenceId];

        if (!worker || worker.status.state !== "PAUSED") {
            throw new Error(`Sequence with id ${sequenceId} does not exist or is not paused`);
        }

        worker.worker.postMessage("resume");
        worker.status.state = "RUNNING";
        emitUpdate(sequenceId);
    };

    const restart = (sequenceId: number) => {
        stop(sequenceId);
        play(sequenceId);
        emitUpdate(sequenceId);
    };

    const getStatus = (sequenceId: number, totalActions: number): PlayoutStatus => {
        const worker = playoutWorkers[sequenceId];
        const addCurrent = worker && worker.status.state !== "STOPPED";
        return {
            state: worker ? worker.status.state : "STOPPED",
            current: addCurrent ? worker.status.current : undefined,
            total: totalActions,
        };
    };

    const emitUpdate = (sequenceId: number) => {
        const sequence = fastify.sequences.getById(sequenceId);
        fastify.socketComms.emit("sequenceStatusChange", {
            id: sequence.id,
            status: getStatus(sequence.id, sequence.actions.length),
        });
    };

    const sequencesPlayout: SequencesPlayout = { play, stop, pause, resume, restart, getStatus };

    fastify.decorate("playout", sequencesPlayout);

    done();
};

export default fp(sequencesPlayout);
