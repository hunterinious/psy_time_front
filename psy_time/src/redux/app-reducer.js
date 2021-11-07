export const SET_LAYOUT = 'app/global/layout/SET_LAYOUT';

let initialState = {
   layoutType: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LAYOUT:
            return {
                ...state,
                layoutType: action.layoutType
            }
        default:
            return state;    
    }

}

export const setLayout = (layoutType) => ({type: SET_LAYOUT, layoutType});

export default appReducer;
