import Axios, * as axios from "axios";
import { addAuthorizationHeader, handleUnauthorized } from './interceptors';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/jwtauth/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

axiosInstance.interceptors.request.use( config => {
    config = addAuthorizationHeader(config);
    return config
})


axiosInstance.interceptors.response.use(
    response => response,
    error => {
        return handleUnauthorized(error, axiosInstance)
    }
);

export const authAPI = {
    registerUser(email, password, name){
        return axiosInstance.post(`registration/`, {
            email,
            password,
            profile: {'name' : name}
        }).then(response => {
            return {
                data: response.data,
                status: {
                    text: response.statusText || response.status.text,
                    code: response.status || response.status.code
                }
            }
        }).catch(error =>{
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
        })
    },
}