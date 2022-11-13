import { join } from "path";
import fp from "fastify-plugin";
import { existsSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";
import { SequencesStorage, StoredSequence } from "./interfaces";
import initialContent from "./initialContent";
import { Sequence } from "sequences-types";
import _ from "lodash";
import { FastifyInstance, FastifyLoggerInstance, FastifyPluginCallback } from "fastify";
import { homedir } from "os";
import { promises } from "fs";
import { v4 as uuid } from "uuid";

const STORAGE_PATH = "Documents/sequences";
const storageDir = join(homedir(), STORAGE_PATH);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SequencesStorageOptions {}

interface ImportedSequence {
    filePath: string;
    sequence: StoredSequence;
}

const loadExistingSequences = async (
    logger: FastifyLoggerInstance
): Promise<ImportedSequence[]> => {
    if (existsSync(storageDir)) {
        const files = readdirSync(storageDir);

        return files.reduce(async (dbs, filename: string) => {
            const fullPath = join(storageDir, filename);
            let sequence: StoredSequence;
            try {
                const raw = await promises.readFile(fullPath);
                sequence = JSON.parse(raw.toString());
            } catch {
                logger.error(`Failed to load sequence located in ${filename}.`);
                return dbs;
            }
            const content: ImportedSequence = {
                filePath: fullPath,
                sequence,
            };
            return [...(await dbs), content];
        }, Promise.resolve([]));
    }

    mkdirSync(storageDir, { recursive: true });
    return [];
};

const sequencesStorage: FastifyPluginCallback<SequencesStorageOptions> = async (
    fastify: FastifyInstance,
    _options,
    done
) => {
    const sequences: ImportedSequence[] = await await loadExistingSequences(fastify.log);

    const add = async (name: string, pluginId: number) => {
        const files = readdirSync(storageDir).map((file) => file.slice(0, -5));

        if (
            sequences.find((sequence) => sequence.sequence.name === name) ||
            files.find((file) => file === name)
        ) {
            const message = `Failed to create new sequence with name ${name}. Sequence with this name already exists.`;
            fastify.log.error(message);
            throw new Error(message);
        }

        const filename = `${name}.json`;
        const fullPath = join(storageDir, filename);
        const sequence: ImportedSequence = {
            filePath: fullPath,
            sequence: { ...initialContent, name, pluginId, id: uuid() },
        };
        const content = extractSequenceFromData(sequence);
        try {
            await promises.writeFile(fullPath, JSON.stringify(content));
        } catch {
            fastify.log.error(`Failed to create sequence called ${name}.`);
            throw new Error("Failed to create sequence.");
        }

        sequences.push(sequence);

        fastify.socketComms.emit("sequenceCreated", content);

        return content;
    };

    const remove = (id: string) => {
        const sequenceIdx = sequences.findIndex((seq) => seq.sequence.id === id);
        const message = `Failed to delete sequence with id ${id}.`;
        if (sequenceIdx === -1) {
            fastify.log.error(message);
            throw new Error(message);
        }
        const sequence = sequences[sequenceIdx];
        try {
            unlinkSync(sequence.filePath);
        } catch (err) {
            fastify.log.error(message);
            throw new Error(message);
        }

        fastify.socketComms.emit("sequenceDeleted", { id });
        sequences.splice(sequenceIdx, 1);
    };

    const extractSequenceFromData = (data: ImportedSequence): Sequence => {
        const sequence = _.omit(data.sequence, "_comment");
        return {
            ...sequence,
            playoutStatus: fastify.playout.getStatus(sequence.id, sequence.actions.length),
        };
    };

    const getAll = () => {
        return sequences.map((seq) => extractSequenceFromData(seq));
    };

    const getById = (id: string) => {
        const sequence = sequences.find((seq) => seq.sequence.id === id);
        if (!sequence) throw new Error(`Sequence with id ${id} does not exist`);
        return extractSequenceFromData(sequence);
    };

    const update = async (
        id: string,
        sequence: Partial<Omit<Sequence, "id">>
    ): Promise<Sequence> => {
        const oldSequence = sequences.find((seq) => seq.sequence.id === id);
        if (!oldSequence) throw new Error(`Sequence with id ${id} does not exist`);
        oldSequence.sequence = { ...oldSequence.sequence, ...sequence };
        try {
            await promises.writeFile(oldSequence.filePath, JSON.stringify(oldSequence.sequence));
        } catch {
            fastify.log.error(`Failed to update sequence called ${name}.`);
            throw new Error("Failed to update sequence.");
        }
        const sequenceUpdated = extractSequenceFromData(oldSequence);

        fastify.socketComms.emit("sequenceUpdated", sequenceUpdated);

        return sequenceUpdated;
    };

    const sequencesStorage: SequencesStorage = {
        getAll,
        getById,
        add,
        update,
        remove,
    };

    fastify.decorate("sequences", sequencesStorage);

    done();
};

export default fp(sequencesStorage);
