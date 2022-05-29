import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import mainReducer from "./main.reducer";
import mainSaga from "./main.saga";
import socketIOMiddleware from "./middlewares/socketIOMiddleware";
import { pluginsInitialState, PluginsState } from "./plugins/plugins.reducer";

export interface RootState {
    plugins: PluginsState;
}

const initialState: RootState = {
    plugins: pluginsInitialState,
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    mainReducer,
    initialState,
    applyMiddleware(sagaMiddleware, socketIOMiddleware)
);

sagaMiddleware.run(mainSaga);

export default store;
