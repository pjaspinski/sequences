import { parentPort, workerData } from "worker_threads";

const handleAction = (delays, idx) => {
    if (idx === delays.length) {
        return;
    }

    parentPort.postMessage(idx);
    setTimeout(() => handleAction(delays, idx + 1), delays[0]);
};

handleAction(workerData.delays, 0);
