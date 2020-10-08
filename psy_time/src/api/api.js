import Axios, * as axios from "axios";
import querystring from 'querystring';

var qs = require('qs');

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    withCredentials: true,
    headers: {
        'Accept': 'application/json'
    }
})

export default axiosInstance

export const psyUsersProfilesListAPI = {

    getPsyUsersProfiles() {
        return axiosInstance.get(`psychologists/`)
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

export const psyUsersProfilesListNavAPI = {
    getCriteriaNamesPsys() {
        return axiosInstance.get(`psychologists/criteria`)
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

    getHowToChoosePsy() {
        return axiosInstance.get(`psychologists/how-to-choose-psychologist`)
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

    getRandomPsyUserProfile() {
        return axiosInstance.get(`psychologists/random`)
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


    getPsysByCriteria(criteria) {
        let c = criteria
        return axiosInstance.get(`psychologists/filter`, {
            params: {
                ages: c.ages.length ? c.ages[0] : [],
                genders: c.genders,
                statuses: c.statuses,
                formats: c.formats,
                themes: c.themes,
                approaches: c.approaches,
                specializations: c.specializations,
                educations: c.educations,
                secondary_educations: c.secondary_educations,
                languages: c.languages
            },
            paramsSerializer: function paramsSerializer(params) {
                // "Hide" the `answer` param
                return querystring.stringify(params)
              }
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
    }
   
}