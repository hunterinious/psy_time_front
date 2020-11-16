export const addAuthorizationHeader = (config) => {
    config.headers['Authorization'] = "JWT " + localStorage.getItem('access_token');
    return config
}

export const handleUnauthorized = (error, axiosInstance) => {
    const originalRequest = error.config;
    const response = error.response
    const wrong_login_or_ps = "No active account found with the given credentials"
    if (response.status === 401 && response.data.detail !== wrong_login_or_ps &&
        response.statusText === "Unauthorized") {
        const refresh_token = localStorage.getItem('refresh_token');
        if(!refresh_token) return Promise.reject(error)

        console.log(Date.parse(localStorage.getItem('refresh_expired') - Date.parse(Date.now())))

        return axiosInstance
            .post('refresh/', {refresh: refresh_token})
            .then((response) => {

                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);

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

