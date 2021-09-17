export const addAuthorizationHeader = (config) => {
    config.headers['Authorization'] = "JWT " + localStorage.getItem('access_token');
    return config
}

export const handleUnauthorized = (error, axiosInstance) => {
    const WRONG_LOGIN_OR_PASSWORD = "No active account found with the given credentials"
    const USER_NOT_FOUND = "User not found"
    const originalRequest = error.config;
    const response = error.response
    const detail = response.data.detail

    if(detail === USER_NOT_FOUND){
        return Promise.reject(error)
    }

    if (response.status === 401 && detail !== WRONG_LOGIN_OR_PASSWORD) {
        const refresh_token = localStorage.getItem('refresh_token');
        const refresh_expire = localStorage.getItem('refresh_expire')

        if(!refresh_token || !refresh_expire || refresh_expire - Date.now() <= 0){
            return Promise.reject(error)
        }

        return axiosInstance
            .post('refresh/', {refresh: refresh_token})
            .then((response) => {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                localStorage.setItem('refresh_expire', response.data.refresh_expire)

                axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                originalRequest.headers['Authorization'] = "JWT " + response.data.access;

                return axiosInstance(originalRequest);
            })
            .catch(error => {
              return Promise.reject(error)
            });
    }
    return Promise.reject(error);
}

