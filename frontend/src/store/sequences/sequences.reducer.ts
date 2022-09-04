import { Sequence } from "sequences-types";
import {
    SequenceCreateSuccess,
    SequenceDeleteSuccess,
    SequencesActionTypes,
    SequencesFetchSuccess,
    SequenceUpdateStatus,
    SequenceUpdateSuccess,
} from "./sequences.actions";

export interface SequencesState {
    model: Sequence[];
}

export const sequencesInitialState = {
    model: [],
};

type SequencesAction =
    | SequencesFetchSuccess
    | SequenceUpdateStatus
    | SequenceCreateSuccess
    | SequenceUpdateSuccess
    | SequenceDeleteSuccess;

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
        case SequencesActionTypes.SEQUENCES_CREATE_SUCCESS:
            return {
                ...state,
                model: [...state.model, action.payload],
            };
        case SequencesActionTypes.SEQUENCES_DELETE_SUCCESS:
            return {
                ...state,
                model: state.model.filter((sequence) => sequence.id !== action.payload.id),
            };
        case SequencesActionTypes.SEQUENCES_UPDATE_SUCCESS:
            console.log(action.payload, state.model);
            return {
                ...state,
                model: state.model.map((sequence) =>
                    sequence.id === action.payload.id ? action.payload : sequence
                ),
            };
        default:
            return state;
    }
};
