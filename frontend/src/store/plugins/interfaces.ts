import { Input, PluginStatus } from "sequences-types";

export interface Plugin {
    settingsInputs: Input[];
    name: string;
    id: number;
    active: boolean;
    status: PluginStatus;
}
