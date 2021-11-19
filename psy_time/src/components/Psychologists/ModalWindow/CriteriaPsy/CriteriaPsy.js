import React, { useEffect, useState, useReducer, useRef} from 'react';
import SubmitButton from '../../../Common/Buttons/SubmitButton/SubmitButton';
import Buttons from './Buttons';
import RangeSlider from './RangeSlider';
import criteriaPsyService from '../../../../services/criteriaPsyService';
import styles from './CriteriaPsy.module.scss';


const SET_CHOOSEN_CRITERIA = 'SET_CHOOSEN_CRITERIA';
const REMOVE_CRITERION = 'REMOVE_CRITERION';
const ADD_CRITERION = 'ADD_CRITERION';
const ADD_AGE_CRITERION = 'ADD_AGE_CRITERION';


function reducer(state, action){
    let data = action.data
    switch(action.type) {
        case SET_CHOOSEN_CRITERIA:
            return {
                ...state,
                choosenCriteria: action.choosenCriteria
            }        
        case REMOVE_CRITERION:
            return {
                ...state,
                choosenCriteria: {
                    ...state.choosenCriteria,
                    [data.key]: [
                        ...state.choosenCriteria[data.key]
                        .filter(e => e[0] !== data.id)
                    ]
                }
            }
        case ADD_CRITERION:
            return {
                ...state,
                choosenCriteria: {
                    ...state.choosenCriteria,
                    [data.key]: [
                        ...state.choosenCriteria[data.key],
                        [ data.id, data.name ]
                    ]
                    
                }
            }
        case ADD_AGE_CRITERION:
            return {
                ...state,
                choosenCriteria: {
                    ...state.choosenCriteria,
                    [data.key]: [
                        data.name 
                    ]
                }
            }
        default:
            return state
    }
}

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  

const CriteriaPsy = (props) => {
    const {choosenCriteria, criteriaNames, changeCriteria, removeCriteria, getPsysByCriteria, hideModal} = props
    const [state, setState] = useReducer(reducer, { choosenCriteria: choosenCriteria, criteriaNames: criteriaNames })
    const prevCriteria = usePrevious(state.choosenCriteria)
                                                  
    const ageMinMax = criteriaNames.ages[0].name.split('-')
    const ageMin = parseInt(ageMinMax[0])
    const ageMax = parseInt(ageMinMax[1])
    const [ageRange, setAgeRange] = useState(() => {
        const ages = choosenCriteria.ages
        if(ages.length > 0){
            return ages[0]
        }
        return [ageMin, ageMax]
    });
    const criteriaNamesText=  ["Age", "Gender", "Status", "Formats", "Work with themes", 
                              "Approaches used", "Specializations", "Educations",
                              "Secondary educations", "Languages"];
    
    useEffect(() => {
        setState({type: SET_CHOOSEN_CRITERIA, choosenCriteria: choosenCriteria })
    }, [choosenCriteria]);

    const choosenCriteriaOnlyNames = (choosenCriteria) => {
       return criteriaPsyService.choosenCriteriaOnlyNames(choosenCriteria)
    }

    const areAnyChoosenCriteria = (choosenCriteria) => {
        let count = 0
        for (const [key, value] of Object.entries(choosenCriteria)){
           if(value.length){
               count += 1
           }
        }
        if(count){
            return true
        }
        return false
    }

    const isCriterionChoosen = (index, key) => {
        const choosenCriteria = state.choosenCriteria
        let finded = false
        if (choosenCriteria[key]){
            choosenCriteria[key].forEach(c => {
                if(c[0] === index){
                    finded = true
                }
            });
        }

        return finded
    }

    const handleCriterionClick = (e) => {
        const target = e.target
        
        if(target.tagName === "BUTTON"){
            const keyId = target.id.split('-')
            const key = keyId[0]
            const id = parseInt(keyId[1])
            const name = target.textContent

            const finded = isCriterionChoosen(id, key)

            if(finded) {
                setState({ type: REMOVE_CRITERION, data: {key, id}})
            }else{
                if(key === 'genders'){
                    const genderCriteria = state.choosenCriteria[key]
                    if(genderCriteria.length > 0){
                        const gender_id = genderCriteria[0][0]
                        setState({ type: REMOVE_CRITERION, data: {key, id:gender_id }})
                    }
                }
                setState({ type: ADD_CRITERION, data: {key, id, name}})
            }
        }
    }

    const handleAgeCriterionChange = (value) => {
        setAgeRange(value)
        setState({type: ADD_AGE_CRITERION, data: {key: "ages", name: value}})
    }

    const handleSubmit = () => {
        const choosenCriteria = state.choosenCriteria
        changeCriteria(choosenCriteria)

        const areAny = areAnyChoosenCriteria(choosenCriteria)
        if(state.choosenCriteria !== prevCriteria && areAny) {
            const choosenCriteriaForAPI = choosenCriteriaOnlyNames(choosenCriteria)
            getPsysByCriteria({pageNumber: 1, criteria: choosenCriteriaForAPI, isCriteriaChanged: true})
        
        }

        hideModal()
    }

    const handleRemove = () => {
        removeCriteria()
        setAgeRange([ageMin, ageMax])
        setState({type: SET_CHOOSEN_CRITERIA, choosenCriteria: choosenCriteria })
    }

    const setClassName = (index, key) => {
        if (state.choosenCriteria[key].length === 0){
            return "btn btn-outline-secondary"
        }

        const finded = isCriterionChoosen(index, key)

        return (finded ? "btn btn-outline-primary" : "btn btn-outline-secondary")
    }

    return (
        <div>
            <SubmitButton id="remove-button" onClick={handleRemove}>
                Reset filters
            </SubmitButton>
            <div className={styles.CriteriaPsyFilters} onClick={handleCriterionClick}>
                { 
                Object.keys(state.criteriaNames).map((k, i) => (
                    <div>
                        <div>
                            <label className="control-label">
                                {criteriaNamesText[i]}
                            </label>
                        </div>
                        <div id={k} >
                            <div class="mb-3">
                                {k === "ages" 
                                ?   
                                <RangeSlider value={ageRange}
                                min={ageMin}
                                max={ageMax}
                                onChange={handleAgeCriterionChange}
                                tipFormatter={() => ageRange[0] + "-" + ageRange[1] }/>
                                :   <Buttons criteriaNames={state.criteriaNames} itemsKey={k}
                                        setClassName={setClassName} 
                                    />
                                }
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
            <div className="mb-3 form-submit">
                <SubmitButton id="submit-button"  onClick={handleSubmit}>
                    Apply
                </SubmitButton>
            </div>
        </div>
    )
}

export default CriteriaPsy;
