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

export const updatePrivateRegularUserProfile = (id, formValues, formActions) => async (dispatch) => {
    const password = formValues.password ? formValues.password : null
    const {email, name, timezone} = formValues

    try{
        const data = await profileAPI.updateRegularUserProfile(id, email, password, name, timezone.value)
        if(data.status.code === 200) {
            await dispatch(setUserProfile(data.data))
        }
    }catch(error) {
        if(error?.status?.code === 400){
            for (const [key, value] of Object.entries(error.data)) {
                formActions.setFieldError(key, value[0])    
           }
        }
    }
}

export const updatePrivatePsyUserProfile = (id, formValues, formActions) => async (dispatch) => {
    const password = formValues.password ? formValues.password : null
    const {email, name, city, country, timezone} = formValues

    try{
        const data = await profileAPI.updatePsyUserProfile(id, email, password, name, city.value, country.value, timezone.value)
        if(data.status.code === 200) {
            await dispatch(setUserProfile(data.data))
        }
    }catch(error) {
        if(error?.status?.code === 400){
            for (const [key, value] of Object.entries(error.data)) {
                formActions.setFieldError(key, value[0])    
           }
        }
    }
}


export default privateProfileReducer;