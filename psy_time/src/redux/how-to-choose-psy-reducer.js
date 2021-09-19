import { psyUsersProfilesListNavAPI } from '../api/psyPublicProfilesAPI';


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

export const getHowToChoosePsy = () => async (dispatch) => {
    let data = await psyUsersProfilesListNavAPI.getHowToChoosePsy()
    if(data.status.code === 200) {
        dispatch(howToChoosePsy(data.data))
    }
}

export default howToChoosePsyReducer;
