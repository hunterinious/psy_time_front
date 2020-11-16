import { authAPI } from '../api/authAPI';


let initialState = {
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;    
    }

}


export const setTokenData = (access_token, refresh_token, refresh_expired) => async(dispatch) => {
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    localStorage.setItem('refresh_expired', refresh_expired)
}


export default authReducer;
