import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import fp from "fastify-plugin";
import { existsSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";
import { SequencesStorage, StoredSequence } from "./interfaces.js";
import initialContent from "./initialContent.js";
import { Sequence } from "sequences-types";
import _ from "lodash";
import { FastifyInstance } from "fastify";

const STORAGE_PATH = "data/sequences";

const loadExistingSequences = async (logger): Promise<Low<StoredSequence>[]> => {
    const storageDir = join(dirname("."), STORAGE_PATH);

    if (existsSync(storageDir)) {
        const files = readdirSync(storageDir);

        return files.reduce(async (dbs, filename: string) => {
            const fullPath = join(dirname("."), STORAGE_PATH, filename);
            let db: Low<StoredSequence> | undefined;
            try {
                db = new Low(new JSONFile<StoredSequence>(fullPath));
                await db.read();
            } catch {
                logger.error(`Failed to load sequence located in ${filename}.`);
                return dbs;
            }

            return [...(await dbs), db];
        }, Promise.resolve([]));
    }

    mkdirSync(storageDir, { recursive: true });
    return [];
};

const sequencesStorage = async (fastify: FastifyInstance, options, done) => {
    const sequences: { [key: number]: Low<StoredSequence> } = await (
        await loadExistingSequences(fastify.log)
    ).reduce(
        (agg, sequence, idx) => ({
            ...agg,
            [idx]: sequence,
        }),
        {}
    );
    const storageDir = join(dirname("."), STORAGE_PATH);
    let nextIndex = Object.keys(sequences).length;

    const add = async (name: string, pluginId: number) => {
        const files = readdirSync(storageDir).map((file) => file.slice(0, -5));

        if (
            Object.values(sequences).find((sequence) => sequence.data.name === name) ||
            files.find((file) => file === name)
        ) {
            fastify.log.error(
                `Failed to create new sequence with name ${name}. Sequence with this name already exists.`
            );
            throw new Error("Sequence with this name already exists.");
        }

        const filename = `${name}.json`;

        const fullPath = join(storageDir, filename);
        let db: Low<StoredSequence> | undefined;
        try {
            db = new Low(new JSONFile<StoredSequence>(fullPath));
            await db.read();
        } catch {
            fastify.log.error(`Failed to create sequence called ${name}.`);
            throw new Error("Failed to create sequence.");
        }

        await db.read();
        db.data = { ...initialContent, name, pluginId, _filename: filename };
        await db.write();

        sequences[nextIndex] = db;
        return extractSequenceFromData(db, nextIndex++);
    };

    const remove = (id: number) => {
        if (!Object.keys(sequences).includes(id.toString())) {
            fastify.log.error(`Failed to delete sequence with id ${id}.`);
            throw new Error("Failed to delete sequence.");
        }
        const filename = sequences[id].data._filename;
        const fullPath = join(storageDir, filename);
        try {
            unlinkSync(fullPath);
        } catch (err) {
            fastify.log.error(`Failed to delete file: ${fullPath}.`);
            throw new Error("Failed to delete sequence file.");
        }
        delete sequences[id];
    };

    const extractSequenceFromData = (data: Low<StoredSequence>, id: number): Sequence => {
        const sequence = _.omit(data.data, "_comment", "_filename");
        return {
            ...sequence,
            id,
            playoutStatus: fastify.playout.getStatus(id, sequence.actions.length),
        };
    };

    const getAll = () => {
        return Object.entries(sequences).map(([key, value]) =>
            extractSequenceFromData(value, parseInt(key))
        );
    };

    const getById = (id: number) => {
        const sequence = sequences[id];
        if (!sequence) throw new Error(`Sequence with ${id} does not exist`);
        return extractSequenceFromData(sequence, id);
    };

    const update = async (
        id: number,
        sequence: Partial<Omit<Sequence, "id">>
    ): Promise<Sequence> => {
        const oldSequence = sequences[id];
        if (!oldSequence) throw new Error(`Sequence with ${id} does not exist`);
        oldSequence.data = { ...oldSequence.data, ...sequence };
        await oldSequence.write();
        return extractSequenceFromData(oldSequence, id);
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
