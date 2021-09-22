import { PsyPublicProfilesRequest } from "../api";
import commonApiService from "../services/commonApiService";


const HOW_TO_CHOOSE_PSY = 'HOT_TO_CHOOSE_PSY';


let initialState = {
    howToChoosePsyText: ''
};


const howToChoosePsyReducer = (state = initialState, action) => {
    switch (action.type) {
        case HOW_TO_CHOOSE_PSY:
            return {...state, howToChoosePsyText: action.howToChoosePsyText}
        default:
            return state
    }
}


export const howToChoosePsy = (howToChoosePsyText) =>  ({ type: HOW_TO_CHOOSE_PSY, howToChoosePsyText })

export const getHowToChoosePsy = (onSuccess, onFail) => async (dispatch) => {
    const apiData = await commonApiService.callRequest(
        {
            action: PsyPublicProfilesRequest.getHowToChoosePsy,
            onSuccess,
            onFail
        }
    )
    if(apiData) {
        dispatch(howToChoosePsy(apiData.data))
    }
}

export default howToChoosePsyReducer;
