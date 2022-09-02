import { Sequence } from "sequences-types";
import {
    SequencesActionTypes,
    SequencesFetchSuccess,
    SequenceUpdateStatus,
} from "./sequences.actions";

export interface SequencesState {
    model: Sequence[];
}

export const sequencesInitialState = {
    model: [],
};

type SequencesAction = SequencesFetchSuccess | SequenceUpdateStatus;

export const sequencesReducer = (
    state: SequencesState = sequencesInitialState,
    action: SequencesAction
) => {
    switch (action.type) {
        case SequencesActionTypes.SEQUENCES_FETCH_SUCCESS:
            return {
                ...state,
                model: action.payload,
            };
        case SequencesActionTypes.SEQUENCES_UPDATE_STATUS:
            return {
                ...state,
                model: state.model.map((sequence) =>
                    sequence.id === action.payload.id
                        ? { ...sequence, playoutStatus: action.payload.status }
                        : sequence
                ),
            };
        default:
            return state;
    }
};
