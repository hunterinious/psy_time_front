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
        requiredAuth: true
    },
    createPsyReview: {
        method: 'post',
        path: () => `${BASE_URL}/reviews/create`,
        requiredAuth: true
    },
    deletePsyReview: {
        method: 'post',
        path: ({id}) => `${BASE_URL}/reviews/${id}/delete`,
        requiredAuth: true
    },
    updatePsyReview: {
        method: 'post',
        path: ({id}) => `${BASE_URL}/reviews/${id}/update`,
        requiredAuth: true
    },
    getPsyUsersProfiles: {
        method: 'get',
        path: ({pageNumber}) => `${BASE_URL}/?page=${pageNumber}`,
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
    getPsysByCriteria: {
        method: 'get',
        path: () => `${BASE_URL}/filter`,
        requiredAuth: false
    }

}
