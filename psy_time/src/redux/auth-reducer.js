import { authAPI } from '../api/authAPI';

const SET_USER_LOGIN_DATA = 'SET_USER_LOGIN_DATA';
const LOGIN_DATA_IS_FETCHING = 'LOGIN_DATA_IS_FTECHING';
const DROP_LOGIN_STATUS = 'DROP_LOGIN_STATUS'


let initialState = {
    isAuth: false,
    loginFailed: false,
    loginDataIsFetching: true,
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
        case LOGIN_DATA_IS_FETCHING:
            return { 
                ...state,
                loginDataIsFetching: action.isFetching,
                loginFailed: action.loginFailed
            }
        case DROP_LOGIN_STATUS:
            return { 
                ...state,
                isAuth: action.isAuth,
                loginDataIsFetching: action.isFetching,
                loginFailed: action.loginFailed
            }
        default:
            return state;    
    }

}

export const setUserLoginData = (profileId, userType, isAuth) => ({ type: SET_USER_LOGIN_DATA, data: {profileId, userType, isAuth}});
export const loginDataIsFetching = (isFetching, loginFailed) => ({ type: LOGIN_DATA_IS_FETCHING, isFetching, loginFailed})
export const dropLoginStatus = ({isAuth, loginFailed, isFetching}) => ({ type: DROP_LOGIN_STATUS, isAuth, loginFailed, isFetching })

export const getUserLoginData = () => async (dispatch) => {
    try {
        dispatch(loginDataIsFetching(true, false))
        let data = await authAPI.getUserLoginData()
        if(data.status.code === 200){
            data = data.data
            dispatch(setUserLoginData(data.profile_id, data.user_type, true))
            dispatch(loginDataIsFetching(false, false))
        }
    } catch(error){
        dispatch(loginDataIsFetching(false, true))
    }
};


export default authReducer;
