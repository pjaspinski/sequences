import { combineReducers } from "redux";
import { actionsReducer } from "./actions/actions.reducer";
import { pluginsReducer } from "./plugins/plugins.reducer";
import { sequencesReducer } from "./sequences/sequences.reducer";

const mainReducer = combineReducers({
    plugins: pluginsReducer,
    actions: actionsReducer,
    sequences: sequencesReducer,
});

export default mainReducer;
