import { PsyPublicProfilesRequest } from '../api';
import { AppRequest } from '../api';
import commonApiService from '../services/commonApiService';


const SET_PSY_USERS_PROFILES = 'SET_PSY_USERS_PROFILE';
const SET_PSY_PROFILES_PAGES_AMOUNT = 'SET_PSY_PROFILES_PAGES_AMOUNT';
const PROFILES_ARE_FETCHING = 'PROFILES_ARE_FETCHING';
const PROFILES_NOT_FOUND = 'PROFILES_NOT_FOUND';
const SET_PSY_PUBLIC_PROFILE = 'SET_PSY_PUBLIC_PROFILE';
const SET_PSY_EXNTENDED_PUBLIC_PROFILE = 'SET_PSY_EXNTENDED_PUBLIC_PROFILE'
const SET_RANDOM_PSY_USER_PROFILE = 'SET_RANDOM_PSY_USER_PROFILE';


let initialState = {
    profiles: [],
    profilesNotFound: false,
    profilesAreFetching: true,
    profilesPagesAmount: 0,
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
        case SET_PSY_PROFILES_PAGES_AMOUNT:
            return {...state, profilesPagesAmount: action.amount}
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
export const setPsyProfilesPagesAmount = (amount) => ({ type: SET_PSY_PROFILES_PAGES_AMOUNT, amount})
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

export const getPsyUsersProfiles = (data, onSuccess, onFail) => async (dispatch) => {
    let profiles = JSON.parse(localStorage.getItem('profiles'))
    if(profiles){
        const profilesAmount = profiles.length
        if(!profilesAmount){
            dispatch(profilesNotFound(true))
        }else{
            const apiData = await commonApiService.callRequest(
                {
                    action: AppRequest.getPageSize(),
                }
            )
            if(apiData){
                dispatch(setPsyUsersProfiles(profiles))
                dispatch(setPsyProfilesPagesAmount(profilesAmount))
                dispatch(profilesNotFound(false))
            }
        }
        dispatch(profilesAreFetching(false))
    }
    else{
        const apiData = await commonApiService.callRequest(
            {
                payload: data,
                action: PsyPublicProfilesRequest.getPsyUsersProfiles,
                onSuccess,
                onFail
            }
        )
        if(apiData) {
            const apiD = apiData.data
            dispatch(setPsyUsersProfiles(apiD.results))
            dispatch(setPsyProfilesPagesAmount(apiD.pages_amount))
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

    let c = criteria
    const apiData = await commonApiService.callRequest(
        {
            action: PsyPublicProfilesRequest.getPsysByCriteria,
            params: {
                ages: c.ages.length ? c.ages[0] : [],
                genders: c.genders,
                statuses: c.statuses,
                formats: c.formats,
                themes: c.themes,
                approaches: c.approaches,
                specializations: c.specializations,
                educations: c.educations,
                secondary_educations: c.secondary_educations,
                languages: c.languages
            },
            onSuccess,
            onFail
        }
    )

    if(apiData) {
        let results = apiData.data.results
        
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