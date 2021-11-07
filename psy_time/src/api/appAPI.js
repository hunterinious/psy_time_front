const BASE_URL = 'core'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    help: {
        method: 'post',
        path: () => `${BASE_URL}/help`,
        requiredAuth: false
    },
    getHowToChoosePsy: {
        method: 'get',
        path: () => `${BASE_URL}/how-to-choose-psychologist`,
        requiredAuth: false
    },
    about: {
        method: 'get',
        path: () => `${BASE_URL}/about`,
        requiredAuth: false
    }
}