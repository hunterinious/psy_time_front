import { combineReducers, createStore, applyMiddleware } from 'redux';
import criteriaReducer from './criteria-reducer';
import howToChoosePsyReducer from './how-to-choose-psy-reducer'
import psyUsersProfilesReducer from './psy-profiles-reducer';
import psyReviewsReducer from './psy-reviews-reducer';
import locationsReducer from './locations-reducer';
import authReducer from './auth-reducer';
import privateProfileReducer from './private-profile-reducer';
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    psychologistsPage: psyUsersProfilesReducer,
    locations: locationsReducer,
    criteria: criteriaReducer,
    howToChoosePsy: howToChoosePsyReducer,
    psyReviews: psyReviewsReducer,
    auth: authReducer,
    profilePage: privateProfileReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;