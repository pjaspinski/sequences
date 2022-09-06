import { combineReducers } from "redux";
import { actionsReducer } from "./actions/actions.reducer";
import { loadersReducer } from "./loaders/loaders.reducer";
import { notificationsReducer } from "./notifications/notifications.reducer";
import { pluginsReducer } from "./plugins/plugins.reducer";
import { sequencesReducer } from "./sequences/sequences.reducer";

const mainReducer = combineReducers({
    plugins: pluginsReducer,
    actions: actionsReducer,
    sequences: sequencesReducer,
    notifications: notificationsReducer,
    loaders: loadersReducer,
});

export default mainReducer;
