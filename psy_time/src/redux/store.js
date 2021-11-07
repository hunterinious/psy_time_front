import { combineReducers, createStore, applyMiddleware } from 'redux';
import appReducer from './app-reducer';
import criteriaReducer from './criteria-reducer';
import psyUsersProfilesReducer from './psy-profiles-reducer';
import psyReviewsReducer from './psy-reviews-reducer';
import locationsReducer from './locations-reducer';
import authReducer from './auth-reducer';
import privateProfileReducer from './private-profile-reducer';
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    app: appReducer,
    psychologistsPage: psyUsersProfilesReducer,
    locations: locationsReducer,
    criteria: criteriaReducer,
    psyReviews: psyReviewsReducer,
    auth: authReducer,
    profile: privateProfileReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;