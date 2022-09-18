import express from "express";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";

const BACKEND_ADDRESS = "http://127.0.0.1:3001";

const proxyOptions = { target: `${BACKEND_ADDRESS}` };

const startServer = () => {
    const app = express();
    const port = 3002;

    app.use(express.static(path.join(__dirname, "../../../frontend/build")));

    const pathsToProxy = ["plugins", "sequences", "socket.io"];

    pathsToProxy.forEach((path) => {
        app.use(`/${path}`, createProxyMiddleware(proxyOptions));
    });

    app.listen(port, () => {
        console.log(`Express - frontend server listening on port ${port}`);
    });
};

export default startServer;
