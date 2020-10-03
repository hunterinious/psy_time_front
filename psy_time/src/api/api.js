import Axios, * as axios from "axios";
import { compose } from "redux";

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

    getPsysByCriteria(criteria) {
        let c = criteria
        return axiosInstance.get(`psychologists/filter/
        ?ages=${c.ages}
        &genders=${c.genders}
        &statuses=${c.statuses}
        &formats=${c.formats}
        &themes=${c.themes}
        &approaches=${c.approaches}
        &specializations=${c.specializations}
        &educations=${c.educations}
        &secondary_educations=${c.secondary_educations}
        &languages=${c.languages}`)
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