import { Sequence } from "sequences-types";

export interface StoredSequence extends Omit<Sequence, "playoutStatus"> {
    _comment: string;
}

export interface SequencesStorage {
    add: (name: string, pluginId: number) => Promise<Sequence>;
    remove: (id: string) => void;
    getAll: () => Sequence[];
    getById: (id: string) => Sequence;
    update: (id: string, sequence: Partial<Omit<Sequence, "id">>) => Promise<Sequence>;
}
