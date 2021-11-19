import commonApiService from '../services/commonApiService';
import { AppRequest } from '../api';

const SET_LAYOUT = 'SET_LAYOUT';
const SET_SHOW_SIDEBAR = 'SET_SHOW_SIDEBAR';
const SET_HOW_TO_CHOOSE_PSY_TEXT = 'SET_HOW_TO_CHOOSE_PSY_TEXT';
const SET_ABOUT_TEXT = 'SET_ABOUT_TEXT';
const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';

let initialState = {
   layoutType: null,
   modal: null,
   showSidebar: false,
   howToChoosePsyText: '',
   aboutText: ''
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LAYOUT:
            return {...state, layoutType: action.layoutType}
        case SET_SHOW_SIDEBAR:
            return {...state, showSidebar: !state.showSidebar}
        case SET_HOW_TO_CHOOSE_PSY_TEXT:
            return {...state, howToChoosePsyText: action.howToChoosePsyText}
        case SET_ABOUT_TEXT:
            return {...state, aboutText: action.aboutText}
        case SHOW_MODAL:
            const {modalType, modalProps} = action
            return {...state, modal: {modalType: modalType, modalProps: modalProps, showModal: true}}
        case HIDE_MODAL:
            return {...state, modal: {showModal: false}}
        default:
            return state;    
    }

}

export const setLayout = (layoutType) => ({type: SET_LAYOUT, layoutType});
export const setShowSidebar = () => ({type: SET_SHOW_SIDEBAR});
export const setHowToChoosePsyText = (howToChoosePsyText) =>  ({ type: SET_HOW_TO_CHOOSE_PSY_TEXT, howToChoosePsyText })
export const setAboutText = (aboutText) =>  ({ type: SET_ABOUT_TEXT, aboutText })
export const showModalAction = ({modalType, modalProps}) => ({ type: SHOW_MODAL, modalType, modalProps })
export const hideModalAction = () => ({ type: HIDE_MODAL })


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
