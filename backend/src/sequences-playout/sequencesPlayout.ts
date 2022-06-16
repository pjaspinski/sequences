import fp from "fastify-plugin";
import { ActiveAction, PluginTemplate } from "sequences-types";
import { SequencesPlayout } from "./interfaces";

const sequencesPlayout = async (fastify, options, done) => {
    const playAction = (actions: ActiveAction[], idx, plugin: PluginTemplate) => {
        plugin.handleAction(actions[idx]);
        if (idx + 1 >= actions.length) return;
        setTimeout(() => playAction(actions, idx + 1, plugin), actions[idx + 1].delay);
    };

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

        setTimeout(() => playAction(sequence.actions, 0, plugin), sequence.actions[0].delay);
    };

    const sequencesPlayout: SequencesPlayout = { play };

    fastify.decorate("playout", sequencesPlayout);

    done();
};

export default fp(sequencesPlayout);
