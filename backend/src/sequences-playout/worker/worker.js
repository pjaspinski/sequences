import { parentPort, workerData } from "worker_threads";

let timeout;
let timeoutEnd;
let timeoutLeft;
let current = 0;
const delays = workerData.delays;

const handleAction = () => {
    if (current === delays.length) {
        return;
    }

    parentPort.postMessage(current);
    current++;
    timeout = setTimeout(() => handleAction(), delays[current]);
    timeoutEnd = Date.now() + delays[current];
};

parentPort.on("message", (value) => {
    if (value === "pause") {
        clearTimeout(timeout);
        timeoutLeft = timeoutEnd - Date.now();
        return;
    }
    if (value === "resume") {
        timeout = setTimeout(() => handleAction(), timeoutLeft);
        timeoutEnd = Date.now() + timeoutLeft;
    }
});

handleAction();
