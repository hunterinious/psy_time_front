import { psyUserProfileAPI } from '../api/psyProfilesAPI';


const SET_PSY_REVIEWS = 'SET_PSY_REVIEWS';
const REVIEWS_ARE_FETCHING = 'REVIEWS_ARE_FETCHING';


let initialState = {
    reviews: [],
    reviewsAreFetching: true,
};



const psyReviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PSY_REVIEWS:
            return {...state, reviews: action.reviews}
        case REVIEWS_ARE_FETCHING:
            return {...state, reviewsAreFetching: action.reviewsAreFetching}
        default:
            return state
    }
}


export const setPsyReviews = (reviews) => ({ type: SET_PSY_REVIEWS, reviews})
export const reviewsAreFetching = (reviewsAreFetching) => ({ type: REVIEWS_ARE_FETCHING, reviewsAreFetching})


export const getPsyReviews = (id) => async (dispatch) => {
    let data = await psyUserProfileAPI.getPsyReviews(id)
    dispatch(reviewsAreFetching(true))
    if(data.status.code === 200) {
        await dispatch(setPsyReviews(data.data.reviews))   
    }
    dispatch(reviewsAreFetching(false))
}


export default psyReviewsReducer;