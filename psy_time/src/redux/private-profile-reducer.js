import { profileAPI } from '../api/profileAPI'


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


export const getUserProfile = (id, userType) => async (dispatch) => {
    let data = undefined
    if(userType === 'R'){
        data = await profileAPI.getRegularUserProfile(id)
    } else if(userType === 'P'){
        data = await profileAPI.getPsyUserProfile(id)
    }
    if(data.status.code === 200) {
        dispatch(setUserProfile(data.data))
    }
}

export const updatePrivateRegularUserProfile = (data) => async (dispatch) => {
    const {id, email, password, name, timezone, onSuccess, onFail} = data
    const psw = password ? password : null

    try{
        const data = await profileAPI.updateRegularUserProfile(id, email, psw, name, timezone)
        if(data.status.code === 200) {
            await dispatch(setUserProfile(data.data))
            if(onSuccess){ onSuccess(data)}
        }
    }catch(error) {
        if(error?.status?.code === 400){
            if(onFail){ onFail(error)}
        }
    }
}

export const updatePrivatePsyUserProfile = (data) => async (dispatch) => {
    const {id, email, password, name, city, country, timezone, onSuccess, onFail} = data
    const psw = password ? password : null

    try{
        const data = await profileAPI.updatePsyUserProfile(id, email, psw, name, city, country, timezone)
        if(data.status.code === 200) {
            await dispatch(setUserProfile(data.data))
            if(onSuccess){ onSuccess(data)}
        }
    }catch(error) {
        if(error?.status?.code === 400){
            if(onFail){ onFail(error)}
        }
    }
}


export default privateProfileReducer;