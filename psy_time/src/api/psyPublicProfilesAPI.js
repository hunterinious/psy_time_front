import Axios, * as axios from "axios";
import querystring from 'querystring';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/psychologists/',
    withCredentials: true,
    headers: {
        'Accept': 'application/json'
    }
})

const BASE_URL = 'psychologists'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getPsyPublicProfile: {
        method: 'get',
        path: ({id}) => `${BASE_URL}/public-profile/${id}/detail`,
        requiredAuth: false
    },
    getPsyExtendedPublicProfile: {
        method: 'get',
        path: ({id}) => `${BASE_URL}/public-extended-profile/${id}/detail`,
        requiredAuth: false
    },
    getPsyReviews: {
        method: 'get',
        path: ({id}) => `${BASE_URL}/reviews/${id}/detail`,
        requiredAuth: false
    },
    getPsyUsersProfiles: {
        method: 'get',
        path: () => `${BASE_URL}`,
        requiredAuth: false
    },
    getCriteriaNamesPsys: {
        method: 'get',
        path: () => `${BASE_URL}/criteria`,
        requiredAuth: false
    },
    getHowToChoosePsy: {
        method: 'get',
        path: () => `${BASE_URL}/how-to-choose-psychologist`,
        requiredAuth: false
    },
    getRandomPsyUserProfile: {
        method: 'get',
        path: () => `${BASE_URL}/random`,
        requiredAuth: false
    },
}


export const psyUsersProfilesListNavAPI = {
    getPsysByCriteria(criteria) {
        let c = criteria
        return axiosInstance.get(`filter`, {
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