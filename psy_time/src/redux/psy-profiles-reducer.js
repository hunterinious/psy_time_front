import { psyUsersProfilesListAPI } from '../api/api';
import { psyUsersProfilesListNavAPI } from '../api/api';

const PROFILES_IS_FETCHING = 'PROFILES_IS_FETCHING';
const CRITERIA_IS_FETCHING = 'CRITERIA_IS_FETCHING';
const SET_PSY_USERS_PROFILES = 'SET_PSY_USERS_PROFILE';
const SET_CRITERIA_NAMES = 'SET_CRITERIA_NAMES';
const SET_INITIAL_CRITERIA = 'SET_INITIAL_CRITERIA';
const ADD_CRITERIA = 'ADD_CRITERIA';
const REMOVE_CRITERIA = 'REMOVE_CRITERIA';
const HOW_TO_CHOOSE_PSY = 'HOT_TO_CHOOSE_PSY';


let initialState = {
    profiles: [],
    criteriaNames: [],
    choosenCriteria: {
        genders: [],
        statuses: [],
        formats: [],
        themes: [],
        approaches: [],
        specializations: [],
        educations: [],
        secondary_educations: [],
        languages: []
    },
    howToChoosePsyText: '',
    profilesIsFetching: true,
    criteriaIsFetching: true,

};



const psyUsersProfilesReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILES_IS_FETCHING:
            return { ...state, profilesIsFetching: action.profilesIsFetching}
        case CRITERIA_IS_FETCHING:
            return { ...state, criteriaIsFetching: action.criteriaIsFetching}
        case SET_PSY_USERS_PROFILES:
            return {...state, profiles: action.profiles}
        case SET_CRITERIA_NAMES:
            return {...state, criteriaNames: action.criteriaNames}
        case SET_INITIAL_CRITERIA:
            return {...state, choosenCriteria: action.criteria}
        case ADD_CRITERIA:
            return {...state, choosenCriteria: action.criteria}
        case REMOVE_CRITERIA:
            return {...state, choosenCriteria: initialState.choosenCriteria}
        case HOW_TO_CHOOSE_PSY:
            return {...state, howToChoosePsyText: action.howToChoosePsyText}
        default:
            return state
    }
}

export const profilesIsFetching = (profilesIsFetching) => ({ type: PROFILES_IS_FETCHING, profilesIsFetching})
export const criteriaIsFetching = (criteriaIsFetching) => ({ type: CRITERIA_IS_FETCHING, criteriaIsFetching})
export const setPsyUsersProfiles = (profiles) => { return { type: SET_PSY_USERS_PROFILES, profiles}}
export const setCriteriaNames = (criteriaNames) => { return { type: SET_CRITERIA_NAMES, criteriaNames }}
export const setInitialCriteria = (criteria) => {return { type: SET_INITIAL_CRITERIA, criteria}}
export const addCriteria = (criteria) => { return { type: ADD_CRITERIA, criteria }}
export const removeCriteria = () => { return { type: REMOVE_CRITERIA }}
export const howToChoosePsy = (howToChoosePsyText) => { return { type: HOW_TO_CHOOSE_PSY, howToChoosePsyText }}


export const getPsyUsersProfiles = () => async (dispatch) => {
    let data = await psyUsersProfilesListAPI.getPsyUsersProfiles()
    if(data.status.code === 200) {
        dispatch(setPsyUsersProfiles(data.data.results))
        dispatch(profilesIsFetching(false))
    }
}

export const getCriteriaNamesPsys = () => async (dispatch) => {
    let data = await psyUsersProfilesListNavAPI.getCriteriaNamesPsys()
    if(data.status.code === 200) {
        dispatch(setCriteriaNames(data.data))
    }
}

export const setInitialCriteriaPsy = () => async (dispatch) => {
    let storageCritetia = JSON.parse(localStorage.getItem('criteria'))
    if(storageCritetia) {
        dispatch(setInitialCriteria(storageCritetia))
    }
    await dispatch(getCriteriaNamesPsys())
    dispatch(criteriaIsFetching(false))
}

export const addCriteriaPsy = (criteria) => async (dispatch) => {
    dispatch(addCriteria(criteria))
}

export const removeCriteriaPsy = () => async (dispatch) => {
    dispatch(removeCriteria())
    localStorage.removeItem('criteria')
}

export const getPsysByCriteria = (criteria) => async (dispatch) => {
    addCriteriaPsy(dispatch, criteria, addCriteria)
    localStorage.setItem('criteria', JSON.stringify(criteria))
    // dispatch(profilesIsFetching(true))
    // let data = await psyUsersProfilesListNavAPI.getPsysByCriteria()
    // if(data.status.code === 200) {
    //     dispatch(setPsyUsersProfiles(data.data.results))
    //     dispatch(profilesIsFetching(false))
    // }
}


export const getHowToChoosePsy = () => async (dispatch) => {
    let data = await psyUsersProfilesListNavAPI.getHowToChoosePsy()
    if(data.status.code === 200) {
        dispatch(howToChoosePsy(data.data))
    }
}


export default psyUsersProfilesReducer;