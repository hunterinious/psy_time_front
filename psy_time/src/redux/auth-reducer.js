import { authAPI } from '../api/authAPI';

const SET_USER_LOGIN_DATA = 'SET_USER_LOGIN_DATA';

let initialState = {
    isAuth: false,
    profileId: null,
    userType: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_LOGIN_DATA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state;    
    }

}

export const setUserLoginData = (profileId, userType, isAuth) => ({ type: SET_USER_LOGIN_DATA, data: {profileId, userType, isAuth}});


export const getUserLoginData = () => async (dispatch) => {
    try {
        let data = await authAPI.getUserLoginData()
        if(data.status.code === 200){
            data = data.data
            dispatch(setUserLoginData(data.profile_id, data.user_type, true))
        }
    } catch(error){
        console.log(error)
    }
};


export default authReducer;
