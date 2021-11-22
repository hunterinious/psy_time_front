import { PsyPublicProfilesRequest } from "../api";
import commonApiService from "../services/commonApiService";

const SET_PSY_REVIEWS = 'SET_PSY_REVIEWS';
const ADD_PSY_REVIEW = 'ADD_PSY_REVIEW';
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
        case ADD_PSY_REVIEW:
            return {...state, reviews: [...state.reviews, action.review]}
        default:
            return state
    }
}


export const setPsyReviews = (reviews) => ({ type: SET_PSY_REVIEWS, reviews})
export const addPsyReview = (review) => ({type: ADD_PSY_REVIEW, review})
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

export const createPsyReview = (data, onSuccess, onFail) => async (dispatch) => {
    const {text, userProfileId, publicProfileId} = data

    const apiData = await commonApiService.callRequest(
        {
            payload: {text, author_profile: userProfileId, psychologist_profile: publicProfileId},
            action: PsyPublicProfilesRequest.createPsyReview,
            onSuccess,
            onFail
        }
    )
    if(apiData) {
        const {id, text, name} = apiData.data
        dispatch(addPsyReview({id, name, text}))   
    }
}


export default psyReviewsReducer;