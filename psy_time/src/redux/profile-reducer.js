import { profileAPI } from '../api/profileAPI'


const SET_USER_PROFILE = 'SET_USER_PROFILE';


let initialState = {
    profile: null,
};


const profileReducer = (state = initialState, action) => {
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


export default profileReducer;