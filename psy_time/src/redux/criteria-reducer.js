import { psyUsersProfilesListNavAPI } from '../api/psyProfilesApi';


const CRITERIA_ARE_FETCHING = 'CRITERIA_ARE_FETCHING';
const SET_CRITERIA_NAMES = 'SET_CRITERIA_NAMES';
const SET_INITIAL_CRITERIA = 'SET_INITIAL_CRITERIA';
const CHANGE_CRITERIA = 'CHANGE_CRITERIA';
const REMOVE_CRITERIA = 'REMOVE_CRITERIA';


let initialState = {
    criteriaNames: [],
    choosenCriteria: {
        ages: [],
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
    criteriaAreFetching: true,
};

const criteriaReducer = (state = initialState, action) => {
    switch (action.type) {
        case CRITERIA_ARE_FETCHING:
            return { ...state, criteriaAreFetching: action.criteriaAreFetching}
        case SET_CRITERIA_NAMES:
            return {...state, criteriaNames: action.criteriaNames}
        case SET_INITIAL_CRITERIA:
            return {...state, choosenCriteria: action.criteria}
        case CHANGE_CRITERIA:
            return {...state, choosenCriteria: action.criteria}
        case REMOVE_CRITERIA:
            return {...state, choosenCriteria: initialState.choosenCriteria}
       
        default:
            return state
    }
}

export const criteriaAreFetching = (criteriaAreFetching) => ({ type: CRITERIA_ARE_FETCHING, criteriaAreFetching})
export const setCriteriaNames = (criteriaNames) =>  ({ type: SET_CRITERIA_NAMES, criteriaNames })
export const setInitialCriteria = (criteria) =>  ({ type: SET_INITIAL_CRITERIA, criteria})
export const changeCriteria = (criteria) => ({ type: CHANGE_CRITERIA, criteria })
export const removeCriteria = () =>  ({ type: REMOVE_CRITERIA })


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
    dispatch(criteriaAreFetching(false))
}

export const changeCriteriaPsy = (criteria) => async (dispatch) => {
    dispatch(changeCriteria(criteria))
    localStorage.setItem('criteria', JSON.stringify(criteria))
}

export const removeCriteriaPsy = () => async (dispatch) => {
    localStorage.removeItem('criteria')
    localStorage.removeItem('profiles')
    dispatch(removeCriteria())
}


export default criteriaReducer;