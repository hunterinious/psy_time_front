import { combineReducers, createStore, applyMiddleware } from 'redux';
import criteriaReducer from './criteria-reducer';
import howToChoosePsyReducer from './how-to-choose-psy-reducer'
import psyUsersProfilesReducer from './psy-profiles-reducer';
import countriesReducer from './countries-reducer';
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    psychologistsPage: psyUsersProfilesReducer,
    countries: countriesReducer,
    criteria: criteriaReducer,
    howToChoosePsy: howToChoosePsyReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;