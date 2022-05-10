import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import moviesReducer from "./reducers/moviesReducer";
import choseCardReducer from "./reducers/choseCardReducer";
import loginReducer from "./reducers/loginReducer";

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
const reducers = combineReducers({
    movies: moviesReducer,
    choseCard: choseCardReducer,
    login: loginReducer,
})

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
window.store = store
export default store;