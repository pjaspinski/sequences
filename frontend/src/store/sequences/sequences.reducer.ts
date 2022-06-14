import { Sequence } from "sequences-types";
import { SequencesActionTypes, SequencesFetchSuccess } from "./sequences.actions";

export interface SequencesState {
    model: Sequence[];
}

export const sequencesInitialState = {
    model: [],
};

type SequencesAction = SequencesFetchSuccess;

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
        default:
            return state;
    }
};
