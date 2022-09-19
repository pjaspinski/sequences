const { parentPort, workerData } = require("worker_threads");

let timeout;
let timeoutEnd;
let timeoutLeft;
let current = 0;
const delays = workerData.delays;

const handleAction = () => {
    if (current === delays.length) {
        parentPort.close();
        return;
    }

    parentPort.postMessage(current);
    current += 1;
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

timeout = setTimeout(() => handleAction(), delays[current]);
timeoutEnd = Date.now() + delays[current];
