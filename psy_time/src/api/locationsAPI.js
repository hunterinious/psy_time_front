import Axios, * as axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/locations/',
    withCredentials: true,
    headers: {
        'Accept': 'application/json'
    }
})


export const locationsAPI = {
    getCountries() {
        return axiosInstance.get(`countries`)
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

    getTimezones() {
        return axiosInstance.get(`timezones`)
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