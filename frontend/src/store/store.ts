import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { ActionsState } from "./actions/actions.reducer";
import { LoadersState } from "./loaders/loaders.reducer";
import mainReducer from "./main.reducer";
import mainSaga from "./main.saga";
import socketIOMiddleware from "./middlewares/socketIOMiddleware";
import { NotificationsState } from "./notifications/notifications.reducer";
import { PluginsState } from "./plugins/plugins.reducer";
import { SequencesState } from "./sequences/sequences.reducer";

export interface RootState {
    plugins: PluginsState;
    actions: ActionsState;
    sequences: SequencesState;
    notifications: NotificationsState;
    loaders: LoadersState;
}

const sagaMiddleware = createSagaMiddleware();

const composeEnchancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    mainReducer,
    {},
    composeEnchancers(applyMiddleware(sagaMiddleware, socketIOMiddleware))
);

sagaMiddleware.run(mainSaga);

export default store;
