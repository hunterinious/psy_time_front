import { PrivateProfileRequest } from '../api';
import commonApiService from '../services/commonApiService';


const SET_USER_PROFILE = 'SET_USER_PROFILE';


let initialState = {
    profile: null,
};


const privateProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state
    }
}


export const setUserProfile = (profile) => { return { type: SET_USER_PROFILE, profile}}


export const getUserProfile = (data, onSuccess, onFail) => async (dispatch) => {
    const {userType} = data
    const action = userType === 'R'
        ? PrivateProfileRequest.getRegularUserProfile
        : PrivateProfileRequest.getPsyUserProfile

    const apiData = await commonApiService.callRequest(
        {
            payload: data,
            action: action,
            onSuccess,
            onFail
        }
    )
    if(apiData){
        dispatch(setUserProfile(apiData.data))
    }
}

export const updatePrivateRegularUserProfile = (data, onSuccess, onFail) => async (dispatch) => {
    const {name, password, timezone} = data
    data.password = password ? password : null
    data.profile = {name, timezone: {name: timezone}}

    const apiData = await commonApiService.callRequest(
        {
            payload: data,
            action: PrivateProfileRequest.updateRegularUserProfile,
            onSuccess,
            onFail
        }
    )
    if(apiData){
        dispatch(setUserProfile(apiData.data))
    }
}

export const updatePrivatePsyUserProfile = (data, onSuccess, onFail) => async (dispatch) => {
    const {name, password, city, country, timezone} = data
    data.password = password ? password : null
    data.profile = {name, city: {name: city, country: {name: country}}, timezone: {name: timezone}}

    const apiData = await commonApiService.callRequest(
        {
            payload: data,
            action: PrivateProfileRequest.updatePsyUserProfile,
            onSuccess,
            onFail
        }
    )
    if(apiData){
        dispatch(setUserProfile(apiData.data))
    }
}


export default privateProfileReducer;