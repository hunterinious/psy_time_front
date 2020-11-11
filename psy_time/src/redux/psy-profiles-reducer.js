import { psyUserProfileAPI } from '../api/psyProfilesApi';
import { psyUsersProfilesListAPI } from '../api/psyProfilesApi';
import { psyUsersProfilesListNavAPI } from '../api/psyProfilesApi';


const SET_PSY_USERS_PROFILES = 'SET_PSY_USERS_PROFILE';
const PROFILES_ARE_FETCHING = 'PROFILES_ARE_FETCHING';
const PROFILES_NOT_FOUND = 'PROFILES_NOT_FOUND';
const SET_PSY_PUBLIC_PROFILE = 'SET_PSY_PUBLIC_PROFILE';
const SET_PSY_EXNTENDED_PUBLIC_PROFILE = 'SET_PSY_EXNTENDED_PUBLIC_PROFILE'
const SET_PSY_REVIEWS = 'SET_PSY_REVIEWS';
const REVIEWS_ARE_FETCHING = 'REVIEWS_ARE_FETCHING';
const SET_RANDOM_PSY_USER_PROFILE = 'SET_RANDOM_PSY_USER_PROFILE';
const HOW_TO_CHOOSE_PSY = 'HOT_TO_CHOOSE_PSY';


let initialState = {
    profiles: [],
    profilesNotFound: false,
    profilesAreFetching: true,
    publicProfile: undefined,
    extendedPublicProfile: undefined,
    reviews: [],
    reviewsAreFetching: true,
    randomProfile: undefined,
    howToChoosePsyText: ''
};



const psyUsersProfilesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PSY_PUBLIC_PROFILE:
            return {...state, publicProfile: action.profile}
        case SET_PSY_EXNTENDED_PUBLIC_PROFILE:
            return {...state, extendedPublicProfile: action.profile}
        case SET_PSY_REVIEWS:
            return {...state, reviews: action.reviews}
        case REVIEWS_ARE_FETCHING:
            return {...state, reviewsAreFetching: action.reviewsAreFetching}
        case PROFILES_ARE_FETCHING:
            return { ...state, profilesAreFetching: action.profilesAreFetching}
        case PROFILES_NOT_FOUND:
            return { ...state, profilesNotFound: action.profilesNotFound}
        case SET_PSY_USERS_PROFILES:
            return {...state, profiles: action.profiles}
        case SET_RANDOM_PSY_USER_PROFILE:
            return {...state, randomProfile: action.profile}
        case HOW_TO_CHOOSE_PSY:
            return {...state, howToChoosePsyText: action.howToChoosePsyText}
        default:
            return state
    }
}


export const setPsyPublicProfile = (profile) => ({ type: SET_PSY_PUBLIC_PROFILE, profile})
export const setPsyExtendedPublicProfile = (profile) => ({ type: SET_PSY_EXNTENDED_PUBLIC_PROFILE, profile})
export const setPsyReviews = (reviews) => ({ type: SET_PSY_REVIEWS, reviews})
export const reviewsAreFetching = (reviewsAreFetching) => ({ type: REVIEWS_ARE_FETCHING, reviewsAreFetching})
export const profilesAreFetching = (profilesAreFetching) => ({ type: PROFILES_ARE_FETCHING, profilesAreFetching})
export const profilesNotFound = (profilesNotFound) => ({ type: PROFILES_NOT_FOUND, profilesNotFound})
export const setPsyUsersProfiles = (profiles) => ({ type: SET_PSY_USERS_PROFILES, profiles})
export const setRandomPsyUserProfile = (profile) =>  ({ type: SET_RANDOM_PSY_USER_PROFILE, profile})
export const howToChoosePsy = (howToChoosePsyText) =>  ({ type: HOW_TO_CHOOSE_PSY, howToChoosePsyText })


export const getPsyExtendedPublicProfile = (id) => async (dispatch) => {
    let data = await psyUserProfileAPI.getPsyExtendedPublicProfile(id)
    if(data.status.code === 200) {
        dispatch(setPsyExtendedPublicProfile(data.data))
    }
}


export const getPsyPublicProfile = (id) => async (dispatch) => {
    let data = await psyUserProfileAPI.getPsyPublicProfile(id)
    if(data.status.code === 200) {
        dispatch(setPsyPublicProfile(data.data))
    }
}

export const getPsyReviews = (id) => async (dispatch) => {
    let data = await psyUserProfileAPI.getPsyReviews(id)
    dispatch(reviewsAreFetching(true))
    if(data.status.code === 200) {
        await dispatch(setPsyReviews(data.data.reviews))   
    }
    dispatch(reviewsAreFetching(false))
}

export const getPsyUsersProfiles = () => async (dispatch) => {
    let profiles = JSON.parse(localStorage.getItem('profiles'))
    if(profiles){
        if(!profiles.length){
            dispatch(profilesNotFound(true))
        }else{
            dispatch(setPsyUsersProfiles(profiles))
            dispatch(profilesNotFound(false))
        }
        dispatch(profilesAreFetching(false))
    }
    else{
        let data = await psyUsersProfilesListAPI.getPsyUsersProfiles()
        if(data.status.code === 200) {
            dispatch(setPsyUsersProfiles(data.data.results))
            dispatch(profilesNotFound(false))
            dispatch(profilesAreFetching(false))
        }
    }
}

export const getRandomPsyUserProfile = () => async (dispatch) => {
    let data = await psyUsersProfilesListNavAPI.getRandomPsyUserProfile()
    if(data.status.code === 200) {
        dispatch(setRandomPsyUserProfile(data.data))
    }
}


export const getPsysByCriteria = (criteria) => async (dispatch) => {
    dispatch(profilesAreFetching(true))
    let data = await psyUsersProfilesListNavAPI.getPsysByCriteria(criteria)
    if(data.status.code === 200) {
        let results = data.data.results
        
        if(results.length){
            dispatch(setPsyUsersProfiles(results))
        }else{
            dispatch(profilesNotFound(true))
        }
        localStorage.setItem('profiles', JSON.stringify(results))
        dispatch(profilesAreFetching(false))
    }
}


export const getHowToChoosePsy = () => async (dispatch) => {
    let data = await psyUsersProfilesListNavAPI.getHowToChoosePsy()
    if(data.status.code === 200) {
        dispatch(howToChoosePsy(data.data))
    }
}


export default psyUsersProfilesReducer;