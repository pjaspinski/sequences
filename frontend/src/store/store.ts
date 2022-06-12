import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { actionsInitialState, ActionsState } from "./actions/actions.reducer";
import mainReducer from "./main.reducer";
import mainSaga from "./main.saga";
import socketIOMiddleware from "./middlewares/socketIOMiddleware";
import { pluginsInitialState, PluginsState } from "./plugins/plugins.reducer";

export interface RootState {
    plugins: PluginsState;
    actions: ActionsState;
}

const initialState: RootState = {
    plugins: pluginsInitialState,
    actions: actionsInitialState,
};

const sagaMiddleware = createSagaMiddleware();

const composeEnchancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    mainReducer,
    {},
    composeEnchancers(applyMiddleware(sagaMiddleware, socketIOMiddleware))
);

sagaMiddleware.run(mainSaga);

export default store;
