import { PsyPublicProfilesRequest } from "../api";
import commonApiService from "../services/commonApiService";

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


export const getPsyReviews = (data, onSuccess, onFail) => async (dispatch) => {
    const apiData = await commonApiService.callRequest(
        {
            payload: data,
            action: PsyPublicProfilesRequest.getPsyReviews,
            onSuccess,
            onFail
        }
    )

    dispatch(reviewsAreFetching(true))
    if(apiData) {
        await dispatch(setPsyReviews(apiData.data.reviews))   
    }
    dispatch(reviewsAreFetching(false))
}


export default psyReviewsReducer;