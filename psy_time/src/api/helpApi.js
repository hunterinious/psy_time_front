import Axios, * as axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/core/',
    withCredentials: true,
    headers: {
        'Accept': 'application/json'
    }
})


export const helpAPI = {
    help(email, username, country, theme, message) {
        return axiosInstance.post(`help`, {
            email,
            username,
            country, 
            theme,
            message
        })
            .then(response => {
                return {
                    data: response.data,
                    status: {
                        text: response.statusText || response.status.text,
                        code: response.status || response.status.code
                    }
                }
            })
            .catch(error => {
                if(error.response) {
                    return Promise.reject({
                        data: error.response.data,
                        status: {
                            text: error.response.statusText || error.response.status.text,
                            code: error.response.status || error.response.status.code
                        }
                    });
                return Promise.reject(error)
                }
            });
    },
}