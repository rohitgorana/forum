import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"
import logger from "redux-logger";

var middlewares = [thunk];
if(process.env.REACT_ENV === 'dev'){
    middlewares.push(logger);
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore(initialState){
    return createStore(rootReducer, initialState,  composeEnhancers(applyMiddleware(...middlewares)))
}

export default configureStore({});