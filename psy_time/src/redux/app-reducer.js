import commonApiService from '../services/commonApiService';
import { AppRequest } from '../api';

const SET_LAYOUT = 'SET_LAYOUT';
const SET_HOW_TO_CHOOSE_PSY_TEXT = 'SET_HOW_TO_CHOOSE_PSY_TEXT';
const SET_ABOUT_TEXT = 'SET_ABOUT_TEXT';

let initialState = {
   layoutType: null,
   howToChoosePsyText: '',
   aboutText: ''
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LAYOUT:
            return {...state, layoutType: action.layoutType}
        case SET_HOW_TO_CHOOSE_PSY_TEXT:
            return {...state, howToChoosePsyText: action.howToChoosePsyText}
        case SET_ABOUT_TEXT:
            return {...state, aboutText: action.aboutText}
        default:
            return state;    
    }

}

export const setLayout = (layoutType) => ({type: SET_LAYOUT, layoutType});

export const setHowToChoosePsyText = (howToChoosePsyText) =>  ({ type: SET_HOW_TO_CHOOSE_PSY_TEXT, howToChoosePsyText })
export const setAboutText = (aboutText) =>  ({ type: SET_ABOUT_TEXT, aboutText })

export const getHowToChoosePsy = (onSuccess, onFail) => async (dispatch) => {
    const apiData = await commonApiService.callRequest(
        {
            action: AppRequest.getHowToChoosePsy,
            onSuccess,
            onFail
        }
    )
    if(apiData) {
        dispatch(setHowToChoosePsyText(apiData.data))
    }
}


export const getAboutText = (onSuccess, onFail) => async (dispatch) => {
    const apiData = await commonApiService.callRequest(
        {
            action: AppRequest.about,
            onSuccess,
            onFail
        }
    )
    if(apiData) {
        dispatch(setAboutText(apiData.data))
    }
}


export default appReducer;
