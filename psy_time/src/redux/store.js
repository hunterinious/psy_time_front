import { combineReducers, createStore, applyMiddleware } from 'redux';
import psyUsersProfilesReducer from './psy-profiles-reducer';
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    psychologistsPage: psyUsersProfilesReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;