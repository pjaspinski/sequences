import { combineReducers } from "redux";
import { actionsReducer } from "./actions/actions.reducer";
import { pluginsReducer } from "./plugins/plugins.reducer";

const mainReducer = combineReducers({ plugins: pluginsReducer, actions: actionsReducer });

export default mainReducer;
