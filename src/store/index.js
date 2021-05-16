import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";
let store;
export default () => {
    store = createStore(rootReducer, applyMiddleware(thunk, logger));
    return store;
};
