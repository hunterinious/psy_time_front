import { LocationRequest } from "../api";
import commonApiService from "../services/commonApiService";

const SET_CITIES = 'SET_CITIES'
const CITIES_ARE_FETCHING = 'CITIES_ARE_FETCHING'
const SET_COUNTRIES = 'SET_COUNTRIES';
const COUNTRIES_ARE_FETCHING = 'COUNTRIES_ARE_FETCHING';
const SET_TIMEZONES = 'SET_TIMEZONES';
const TIMEZONES_ARE_FETCHING = 'TIMEZONES_ARE_FETCHING';


let initialState = {
   countries: [],
   cities: [],
   timezones: [],
   timezonesAreFetching: true,
   countriesAreFetching: true,
   citiesAreFetching: true
};


const locationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CITIES:
            return { ...state, cities: action.cities}
        case CITIES_ARE_FETCHING:
            return { ...state, citiesAreFetching: action.citiesAreFetching}
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

export const setCities = (cities) => ({ type: SET_CITIES, cities})
export const citiesAreFetching = (citiesAreFetching) => ({ type: CITIES_ARE_FETCHING, citiesAreFetching})
export const setCountries = (countries) => ({ type: SET_COUNTRIES, countries})
export const countriesAreFetching = (countriesAreFetching) => ({ type: COUNTRIES_ARE_FETCHING, countriesAreFetching})
export const setTimezones = (timezones) => ({ type: SET_TIMEZONES, timezones})
export const timezonesAreFetching = (timezonesAreFetching) => ({ type: TIMEZONES_ARE_FETCHING, timezonesAreFetching})


export const getCitiesWithCountry = (onSuccess, onFail) => async (dispatch) => {
    const apiData = await commonApiService.callRequest(
        {
            action: LocationRequest.getCitiesWithCountry,
            onSuccess,
            onFail
        }
    )
    if(apiData) {
        const data = apiData.data
        const countries = data.map(v => v.country)
        dispatch(setCountries(countries))
        dispatch(setCities(data))
    }
    dispatch(countriesAreFetching(false))
    dispatch(citiesAreFetching(false))
    
}

export const getCountries = (onSuccess, onFail) => async (dispatch) => {
    const apiData = await commonApiService.callRequest(
        {
            action: LocationRequest.getCountries,
            onSuccess,
            onFail
        }
    )
    if(apiData) {
        dispatch(setCountries(apiData.data))
    }
    dispatch(countriesAreFetching(false))
    
}

export const getTimezones = (onSuccess, onFail) => async (dispatch) => {
    const apiData = await commonApiService.callRequest(
        {
            action: LocationRequest.getTimezones,
            onSuccess,
            onFail
        }
    )
    if(apiData) {
        dispatch(setTimezones(apiData.data))
    }
    dispatch(timezonesAreFetching(false))
}

export default locationsReducer;
