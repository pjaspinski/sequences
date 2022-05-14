import { getPlugins } from "../controllers/plugins.js";

const pluginsRouter = (fastify, options, done) => {
    fastify.get("/plugins", getPlugins);

    done();
};

export default pluginsRouter;
