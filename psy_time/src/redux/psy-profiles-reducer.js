import { PsyPublicProfilesRequest } from '../api';
import commonApiService from '../services/commonApiService';
import { psyUsersProfilesListNavAPI } from '../api/psyPublicProfilesAPI';


const SET_PSY_USERS_PROFILES = 'SET_PSY_USERS_PROFILE';
const PROFILES_ARE_FETCHING = 'PROFILES_ARE_FETCHING';
const PROFILES_NOT_FOUND = 'PROFILES_NOT_FOUND';
const SET_PSY_PUBLIC_PROFILE = 'SET_PSY_PUBLIC_PROFILE';
const SET_PSY_EXNTENDED_PUBLIC_PROFILE = 'SET_PSY_EXNTENDED_PUBLIC_PROFILE'
const SET_RANDOM_PSY_USER_PROFILE = 'SET_RANDOM_PSY_USER_PROFILE';


let initialState = {
    profiles: [],
    profilesNotFound: false,
    profilesAreFetching: true,
    publicProfile: undefined,
    extendedPublicProfile: undefined,
    randomProfile: undefined,
};



const psyUsersProfilesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PSY_PUBLIC_PROFILE:
            return {...state, publicProfile: action.profile}
        case SET_PSY_EXNTENDED_PUBLIC_PROFILE:
            return {...state, extendedPublicProfile: action.profile}
        case PROFILES_ARE_FETCHING:
            return { ...state, profilesAreFetching: action.profilesAreFetching}
        case PROFILES_NOT_FOUND:
            return { ...state, profilesNotFound: action.profilesNotFound}
        case SET_PSY_USERS_PROFILES:
            return {...state, profiles: action.profiles}
        case SET_RANDOM_PSY_USER_PROFILE:
            return {...state, randomProfile: action.profile}
        default:
            return state
    }
}


export const setPsyPublicProfile = (profile) => ({ type: SET_PSY_PUBLIC_PROFILE, profile})
export const setPsyExtendedPublicProfile = (profile) => ({ type: SET_PSY_EXNTENDED_PUBLIC_PROFILE, profile})
export const profilesAreFetching = (profilesAreFetching) => ({ type: PROFILES_ARE_FETCHING, profilesAreFetching})
export const profilesNotFound = (profilesNotFound) => ({ type: PROFILES_NOT_FOUND, profilesNotFound})
export const setPsyUsersProfiles = (profiles) => ({ type: SET_PSY_USERS_PROFILES, profiles})
export const setRandomPsyUserProfile = (profile) =>  ({ type: SET_RANDOM_PSY_USER_PROFILE, profile})


export const getPsyExtendedPublicProfile = (data, onSuccess, onFail) => async (dispatch) => {
    const apiData = await commonApiService.callRequest(
        {
            payload: data,
            action: PsyPublicProfilesRequest.getPsyExtendedPublicProfile,
            onSuccess,
            onFail
        }
    )
    if(apiData) {
        dispatch(setPsyExtendedPublicProfile(apiData.data))
    }
}


export const getPsyPublicProfile = (data, onSuccess, onFail) => async (dispatch) => {
    const apiData = await commonApiService.callRequest(
        {
            payload: data,
            action: PsyPublicProfilesRequest.getPsyPublicProfile,
            onSuccess,
            onFail
        }
    )
    if(apiData) {
        dispatch(setPsyPublicProfile(apiData.data))
    }
}

export const getPsyUsersProfiles = (onSuccess, onFail) => async (dispatch) => {
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
        const apiData = await commonApiService.callRequest(
            {
                action: PsyPublicProfilesRequest.getPsyUsersProfiles,
                onSuccess,
                onFail
            }
        )
        if(apiData) {
            dispatch(setPsyUsersProfiles(apiData.data.results))
            dispatch(profilesNotFound(false))
            dispatch(profilesAreFetching(false))
        }
    }
}

export const getRandomPsyUserProfile = (onSuccess, onFail) => async (dispatch) => {
    const apiData = await commonApiService.callRequest(
        {
            action: PsyPublicProfilesRequest.getRandomPsyUserProfile,
            onSuccess,
            onFail
        }
    )
    if(apiData) {
        dispatch(setRandomPsyUserProfile(apiData.data))
    }
}


export const getPsysByCriteria = (criteria, onSuccess, onFail) => async (dispatch) => {
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


export default psyUsersProfilesReducer;