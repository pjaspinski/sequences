import { getItem, setItem } from "../controllers/test.js";

const testRouter = (fastify, options, done) => {
    fastify.get("/item", getItem);
    fastify.put("/item", setItem);

    done();
};

export default testRouter;
