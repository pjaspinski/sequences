import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import fp from "fastify-plugin";
import { existsSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";
import { Sequence, SequencesStorage } from "./interfaces.js";
import initialContent from "./initialContent.js";

const STORAGE_PATH = "data/sequences";

const loadExistingSequences = async (logger): Promise<Low<Sequence>[]> => {
    const storageDir = join(dirname("."), STORAGE_PATH);

    if (existsSync(storageDir)) {
        const files = readdirSync(storageDir);

        return files.reduce(async (dbs, filename: string) => {
            const fullPath = join(dirname("."), STORAGE_PATH, filename);
            let db: Low<Sequence> | undefined;
            try {
                db = new Low(new JSONFile<Sequence>(fullPath));
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

const sequencesStorage = async (fastify, options, done) => {
    const sequences = await loadExistingSequences(fastify.log);
    const storageDir = join(dirname("."), STORAGE_PATH);

    const add = async (name: string) => {
        const files = readdirSync(storageDir).map((file) => file.slice(0, -5));

        if (
            sequences.find((sequence) => sequence.data.name === name) ||
            files.find((file) => file === name)
        ) {
            fastify.log.error(
                `Failed to create new sequence with name ${name}. Sequence with this name already exists.`
            );
            throw new Error("Sequence with this name already exists.");
        }

        const fullPath = join(storageDir, `${name}.json`);
        let db: Low<Sequence> | undefined;
        try {
            db = new Low(new JSONFile<Sequence>(fullPath));
            await db.read();
        } catch {
            fastify.log.error(`Failed to create sequence called ${name}.`);
            throw new Error("Failed to create sequence.");
        }

        await db.read();
        db.data = { ...initialContent, name };
        await db.write();

        sequences.push(db);
    };

    const remove = (name: string) => {
        const index = sequences.findIndex(
            (sequence) => sequence.data.name === name
        );
        if (index === -1) {
            fastify.log.error(`Failed to delete sequence with name ${name}.`);
            throw new Error("Failed to delete sequence.");
        }
        sequences.splice(index, 1)[0];
        const fullPath = join(storageDir, `${name}.json`);
        try {
            unlinkSync(fullPath);
        } catch (err) {
            fastify.log.error(`Failed to delete file: ${fullPath}.`);
            throw new Error("Failed to delete sequence file.");
        }
    };

    const sequencesStorage: SequencesStorage = {
        sequences,
        add,
        remove,
    };

    fastify.decorate("sequences", sequencesStorage);

    done();
};

export default fp(sequencesStorage);
