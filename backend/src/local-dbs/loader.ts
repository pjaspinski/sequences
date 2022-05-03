import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import fp from "fastify-plugin";

const localDbsLoader = fp(async (fastify, options, done) => {
    const filename = join(dirname("."), "db.json");
    const db = new Low(new JSONFile(filename));

    await db.read();
    db.data ||= { posts: [] };
    await db.write();

    fastify.decorate("localDbs", db);

    done();
});

export default localDbsLoader;
