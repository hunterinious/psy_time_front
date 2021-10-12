const BASE_URL = 'jwtauth'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    loginUser: {
        method: 'post',
        path: () => `${BASE_URL}/api-login/`,
        requiredAuth: false
    },
    refreshToken: {
        method: 'post',
        path: () => `${BASE_URL}/refresh/`,
        requiredAuth: true
    },
    getUserLoginData: {
        method: 'get',
        path: () => `${BASE_URL}/login-data/`,
        requiredAuth: true
    },
    registerUser: {
        method: 'post',
        path: () => `${BASE_URL}/api-registration/`,
        requiredAuth: false
    }
}