import { AuthRequest } from '../api';
import commonApiService from '../services/commonApiService';
import storageService from '../services/storageService';

const LOGIN_USER = 'LOGIN_USER';
const SET_USER_LOGIN_DATA = 'SET_USER_LOGIN_DATA';
const LOGIN_DATA_IS_FETCHING = 'LOGIN_DATA_IS_FTECHING';
const DROP_LOGIN_STATUS = 'DROP_LOGIN_STATUS'


let initialState = {
    isAuth: false,
    loginFailed: false,
    loginDataIsFetching: true,
    userId: null,
    userProfileId: null,
    userType: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                ...action.data
            }
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


export const setUserLoginData = (userId, userProfileId, userType, isAuth) => ({ type: SET_USER_LOGIN_DATA, data: {userId, userProfileId, userType, isAuth}});
export const loginDataIsFetching = (isFetching, loginFailed) => ({ type: LOGIN_DATA_IS_FETCHING, isFetching, loginFailed})
export const dropLoginStatus = ({isAuth, loginFailed, isFetching}) => ({ type: DROP_LOGIN_STATUS, isAuth, loginFailed, isFetching })

export const logoutUser = (onSuccess, onFail) => {
    storageService.removeTokens()
}

export const loginUser = async (data, onSuccess, onFail) => {
    const apiData = await commonApiService.callRequest(
        {   
            payload: data,
            action: AuthRequest.loginUser,
            onFail
        }
    )

    if(apiData){
        const data = apiData.data
        storageService.setTokens(data.access, data.refresh)
        onSuccess(apiData)
    }
}

export const getUserLoginData = (onSuccess, onFail) => async (dispatch) => {
        await dispatch(loginDataIsFetching(true, false))
        const apiData = await commonApiService.callRequest(
            {
                action: AuthRequest.getUserLoginData,
                onSuccess,
                onFail
            }
        )

        if(apiData){
            const data = apiData.data
            dispatch(setUserLoginData(data.id, data.profile_id, data.user_type, true))
            dispatch(loginDataIsFetching(false, false))
        }else{
            dispatch(loginDataIsFetching(false, true))
        }
};

export const registerUser = async (data, onSuccess, onFail) => {
    const {name, timezoneName} = data
    data.profile = {'name' : name, 'timezone': {name: timezoneName}}

    const apiData = await commonApiService.callRequest(
        {   
            payload: data,
            action: AuthRequest.registerUser,
            onFail
        }
    )
    if(apiData){
        const data = apiData.data
        storageService.setTokens(data.access, data.refresh)
        onSuccess(apiData)
    }
}



export default authReducer;
