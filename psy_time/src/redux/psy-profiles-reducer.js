import { psyUsersProfilesListAPI } from '../api/api';
import { psyUsersProfilesListNavAPI } from '../api/api';

const PROFILES_IS_FETCHING = 'PROFILES_IS_FETCHING';
const CRITERIA_IS_FETCHING = 'CRITERIA_IS_FETCHING';
const SET_PSY_USERS_PROFILES = 'SET_PSY_USERS_PROFILE';
const SET_CRITERIA = 'SET_CRITERIA';
const ADD_CRITERION = 'ADD_CRITERION';
const REMOVE_CRITERION = 'REMOVE_CRITERION';


let initialState = {
    profiles: [],
    criteria: [],
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
        case SET_CRITERIA:
            return {...state, criteria: action.criteria}
        case ADD_CRITERION:
            let adata = action.data
            return {
                ...state,
                choosenCriteria: {
                    ...state.choosenCriteria,
                    [adata.key]: [
                        ...state.choosenCriteria[adata.key],
                        [ adata.id, adata.name ]
                    ]
              
                }
            }
        case REMOVE_CRITERION:
            let rdata = action.data
            return {
                ...state,
                choosenCriteria: {
                    ...state.choosenCriteria,
                    [rdata.key]: [
                        ...state.choosenCriteria[rdata.key]
                        .filter((e, index) => e[0] !== rdata.id)
                    ]
                
                }
            }
        default:
            return state
    }
}

export const profilesIsFetching = (profilesIsFetching) => ({ type: PROFILES_IS_FETCHING, profilesIsFetching})
export const criteriaIsFetching = (criteriaIsFetching) => ({ type: CRITERIA_IS_FETCHING, criteriaIsFetching})
export const setPsyUsersProfiles = (profiles) => { return { type: SET_PSY_USERS_PROFILES, profiles}}
export const setCriteriaPsy = (criteria) => { return { type: SET_CRITERIA, criteria}}
export const addCriterion = (key, id, name) => { return { type: ADD_CRITERION, data: {key, id, name} }}
export const removeCriterion = (key, id) => { return { type: REMOVE_CRITERION, data: {key, id} }}

export const getPsyUsersProfiles = () => async (dispatch) => {
    let data = await psyUsersProfilesListAPI.getPsyUsersProfiles()
    if(data.status.code === 200) {
        dispatch(setPsyUsersProfiles(data.data.results))
        dispatch(profilesIsFetching(false))
    }
}

export const getCriteriaPsy = () => async (dispatch) => {
    dispatch(criteriaIsFetching(true))
    let data = await psyUsersProfilesListNavAPI.getPsychologistsCriteria()
    if(data.status.code === 200) {
        dispatch(setCriteriaPsy(data.data))
        dispatch(criteriaIsFetching(false))
    }
}


export default psyUsersProfilesReducer;