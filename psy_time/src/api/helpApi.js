const BASE_URL = 'core'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    help: {
        method: 'post',
        path: () => `${BASE_URL}/help`,
        requiredAuth: false
    }
}