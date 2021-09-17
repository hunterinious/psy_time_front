import { locationsAPI } from '../api/locationsAPI';

const SET_COUNTRIES = 'SET_COUNTRIES';
const COUNTRIES_ARE_FETCHING = 'COUNTRIES_ARE_FETCHING';
const SET_TIMEZONES = 'SET_TIMEZONES';
const TIMEZONES_ARE_FETCHING = 'TIMEZONES_ARE_FETCHING';


let initialState = {
   countries: [],
   cities: [],
   timezones: [],
   timezonesAreFetching: true,
   countriesAreFetching: true
};



const locationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COUNTRIES:
            return { ...state, countries: action.countries}
        case COUNTRIES_ARE_FETCHING:
            return { ...state, countriesAreFetching: action.countriesAreFetching}
        case SET_TIMEZONES:
            return { ...state, timezones: action.timezones}
        case TIMEZONES_ARE_FETCHING:
            return { ...state, timezonesAreFetching: action.timezonesAreFetching}
    default:
            return state
    }
}


export const setCountries = (countries) => ({ type: SET_COUNTRIES, countries})
export const countriesAreFetching = (countriesAreFetching) => ({ type: COUNTRIES_ARE_FETCHING, countriesAreFetching})
export const setTimezones = (timezones) => ({ type: SET_TIMEZONES, timezones})
export const timezonesAreFetching = (timezonesAreFetching) => ({ type: TIMEZONES_ARE_FETCHING, timezonesAreFetching})


export const getCountries = () => async (dispatch) => {
    let data = await locationsAPI.getCountries()
    if(data.status.code === 200) {
        let new_data = data.data.map(v => {
            return { value: v.name, label: v.name }
        })
        dispatch(setCountries(new_data))
    }
    dispatch(countriesAreFetching(false))
    
}

export const getTimezones = () => async (dispatch) => {
    let data = await locationsAPI.getTimezones()
    if(data.status.code === 200) {
        let new_data = data.data.map(v => {
            return { value: v.name, label: v.name }
        })
        dispatch(setTimezones(new_data))
    }
    dispatch(timezonesAreFetching(false))
    
}

export default locationsReducer;