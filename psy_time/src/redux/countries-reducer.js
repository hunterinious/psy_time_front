import { countriesAPI } from '../api/countriesAPI';

const SET_COUNTRIES = 'SET_COUNTRIES';
const COUNTRIES_ARE_FETCHING = 'COUNTRIES_ARE_FETCHING';


let initialState = {
   countries: [],
   cities: [],
   countriesAreFetching: true
};



const countriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COUNTRIES:
            return { ...state, countries: action.countries}
        case COUNTRIES_ARE_FETCHING:
            return { ...state, countriesAreFetching: action.countriesAreFetching}
    default:
            return state
    }
}


export const setCountries = (countries) => ({ type: SET_COUNTRIES, countries})
export const countriesAreFetching = (countriesAreFetching) => ({ type: COUNTRIES_ARE_FETCHING, countriesAreFetching})


export const getCountries = () => async (dispatch) => {
    let data = await countriesAPI.getCountries()
    if(data.status.code === 200) {
        let new_data = data.data.map(v => {
            return { value: v.name, label: v.name }
        })
        dispatch(setCountries(new_data))
    }
    dispatch(countriesAreFetching(false))
    
}

export default countriesReducer;