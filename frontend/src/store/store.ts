import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import mainReducer from "./main.reducer";
import mainSaga from "./main.saga";

interface RootState {}

const initialState: RootState = {};
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    mainReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(mainSaga);

export default store;
