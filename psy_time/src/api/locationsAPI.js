const BASE_URL = 'locations'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getCountries: {
        method: 'get',
        path: () => `${BASE_URL}/countries`,
        requiredAuth: false
    },
    getCitiesWithCountry: {
        method: 'get',
        path: () => `${BASE_URL}/cities`,
        requiredAuth: false
    },
    getTimezones: {
        method: 'get',
        path: () => `${BASE_URL}/timezones`,
        requiredAuth: false
    },
}
