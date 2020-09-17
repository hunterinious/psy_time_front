import { psyUsersProfilesAPI } from '../api/api';

const TOGGLE_IS_FETCHING = 'TOOGLE_IS_FETCHING';
const SET_PSY_USERS_PROFILES = 'SET_PSY_USER_PROFILE';


let initialState = {
    profiles: [],
    isFetching: true
};


const psyUsersProfilesReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching}
        case SET_PSY_USERS_PROFILES:
            return {...state, profiles: action.profiles}
        default:
            return state
    }
}

export const setUsersProfiles = (profiles) => { return { type: SET_PSY_USERS_PROFILES, profiles}}
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching})

export const getPsyUsersProfiles = () => async (dispatch) => {
    let data = await psyUsersProfilesAPI.getPsyUsersProfiles()
    if(data.status.code === 200) {
        dispatch(toggleIsFetching(false))
        dispatch(setUsersProfiles(data.data.results))
    }
}

export default psyUsersProfilesReducer;