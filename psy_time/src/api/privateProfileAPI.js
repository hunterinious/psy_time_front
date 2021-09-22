// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getRegularUserProfile: {
        method: 'get',
        path: ({id}) => `users/profile/${id}/retrieve-update`,
        requiredAuth: true
    },
    updateRegularUserProfile: {
        method: 'patch',
        path: ({id}) => `users/profile/${id}/retrieve-update`,
        requiredAuth: true
    },
    getPsyUserProfile: {
        method: 'get',
        path: ({id}) => `psychologists/profile/${id}/retrieve-update`,
        requiredAuth: true
    },
    updatePsyUserProfile: {
        method: 'patch',
        path: ({id}) => `psychologists/profile/${id}/retrieve-update`,
        requiredAuth: true
    },
}