import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import fp from "fastify-plugin";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { Sequence } from "./interfaces.js";

const STORAGE_PATH = "data/sequences";

const loadExistingSequences = async (logger): Promise<Low<Sequence>[]> => {
    const storageDir = join(dirname("."), STORAGE_PATH);

    if (existsSync(storageDir)) {
        const files = readdirSync(storageDir);

        files.reduce(async (dbs, filename: string) => {
            const fullPath = join(dirname("."), STORAGE_PATH, filename);
            let db: Low | undefined;
            try {
                db = new Low(new JSONFile<Sequence>(fullPath));
                await db.read();
            } catch {
                logger.warn(`Failed to load sequence located in ${filename}.`);
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

    fastify.decorate("sequences", sequences);

    done();
};

export default fp(sequencesStorage);
