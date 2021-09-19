import Axios, * as axios from "axios";
import { addAuthorizationHeader, handleUnauthorized } from './interceptors';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    withCredentials: true,
    headers: {
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


export const profileAPI = {
    getRegularUserProfile(id) {
        return axiosInstance.get(`users/profile/${id}/retrieve-update`)
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

    updateRegularUserProfile(id, email, password, name, timezoneName) {
        return axiosInstance.patch(`users/profile/${id}/retrieve-update`, {
            email,
            password,
            profile: {name, timezone: {name: timezoneName}}
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


    getPsyUserProfile(id) {
        return axiosInstance.get(`psychologists/profile/${id}/retrieve-update`)
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


    updatePsyUserProfile(id, email, password, name, cityName, countryName, timezoneName) {
        return axiosInstance.patch(`psychologists/profile/${id}/retrieve-update`, {
            email,
            password,
            profile: {name, city: {name: cityName, country: {name: countryName}}, timezone: {name: timezoneName}}
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