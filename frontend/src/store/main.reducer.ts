import { combineReducers } from "redux";
import { pluginsReducer } from "./plugins/plugins.reducer";

const mainReducer = combineReducers({ plugins: pluginsReducer });

export default mainReducer;
