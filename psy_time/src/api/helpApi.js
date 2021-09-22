const BASE_URL = 'core'

export default {
    help: {
        method: 'post',
        path: () => `${BASE_URL}/help`,
        requiredAuth: false
    }
}