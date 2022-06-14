import { ActiveAction } from "sequences-types";

export const getDurationString = (actions: ActiveAction[]): string => {
    const length = actions.reduce((acc, action) => acc + action.delay, 0);
    const seconds = Math.floor(length / 1000);
    if (seconds < 1) return `${length} ms`;
    const minutes = Math.floor(length / 1000 / 60);
    if (minutes < 1) return `${seconds} s `;
    const hours = Math.floor(length / 1000 / 60 / 60);
    if (hours < 1) return `${minutes} m ${seconds % 60} s`;
    return `${hours} h ${minutes % 60} m ${seconds % 60} s`;
};
