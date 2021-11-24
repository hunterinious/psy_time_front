import { PsyPublicProfilesRequest } from "../api";
import commonApiService from "../services/commonApiService";

const SET_PSY_REVIEWS = 'SET_PSY_REVIEWS';
const ADD_PSY_REVIEW = 'ADD_PSY_REVIEW';
const REMOVE_PSY_REVIEW = 'REMOVE_PSY_REVIEW';
const EDIT_PSY_REVIEW = 'EDIT_PSY_REVIEW';
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
        case EDIT_PSY_REVIEW:
            const {id, text} = action
            return {
                ...state,
                reviews: 
                    state.reviews.map(item => {
                        if(item.id === id) {
                            return {
                                ...item,
                                text: text
                            }
                        }
                        return item;
                    })
            }
        case REMOVE_PSY_REVIEW:
            return {...state, reviews: state.reviews.filter(r => r.id!== action.id)}
        default:
            return state
    }
}


export const setPsyReviews = (reviews) => ({ type: SET_PSY_REVIEWS, reviews})
export const addPsyReview = (review) => ({type: ADD_PSY_REVIEW, review})
export const removePsyReview = (id) => ({type: REMOVE_PSY_REVIEW, id})
export const editPsyReview = (id, text) => ({type: EDIT_PSY_REVIEW, id, text})
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
        const {id, text, name, editable} = apiData.data
        dispatch(addPsyReview({id, name, text, editable}))   
    }
}

export const updatePsyReview = (data, onSuccess, onFail) => async (dispatch) => {
    const {id} = data
    const apiData = await commonApiService.callRequest(
        {
            payload: data,
            action: PsyPublicProfilesRequest.updatePsyReview,
            onSuccess,
            onFail
        }
    )
    if(apiData) {
        const {text} = apiData.data
        dispatch(editPsyReview(id, text))
    }
}


export const deletePsyReview = (data, onSuccess, onFail) => async (dispatch) => {
    const {id} = data
    const apiData = await commonApiService.callRequest(
        {
            payload: data,
            action: PsyPublicProfilesRequest.deletePsyReview,
            onSuccess,
            onFail
        }
    )
    if(apiData) {
        if(apiData.status.code === 204){
            dispatch(removePsyReview(id))
        }   
    }
}


export default psyReviewsReducer;