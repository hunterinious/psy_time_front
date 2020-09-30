import React, { useEffect, useState, useReducer} from 'react';
import Buttons from './Buttons';
import RangeSlider from './RangeSlider';


function reducer(state, action){
    let data = action.data
    switch(action.type) {
        case 'setChoosenCriteria':
            return {
                ...state,
                choosenCriteria: action.choosenCriteria
            }        
        case 'removeCriterion':
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
        case 'addCriterion':
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
        case 'addAgeCriterion':
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

const CriteriaPsy = (props) => {
    let [state, setState] = useReducer(reducer, { choosenCriteria: props.choosenCriteria,
                                                  criteriaNames: props.criteriaNames })
    const ageMinMax = props.criteriaNames.ages[0].name.split('-')
    const ageMin = parseInt(ageMinMax[0])
    const ageMax = parseInt(ageMinMax[1])
    const [ageRange, setAgeRange] = useState(() => {
        const ages = props.choosenCriteria.ages
        if(ages.length > 0){
            return ages[0]
        }
        return [ageMin, ageMax]
    });
    const criteriaNamesText=  ["Age", "Gender", "Status", "Formats", "Work with themes", 
                              "Approaches used", "Specializations", "Educations",
                              "Secondary educations", "Languages"];
    
    useEffect(() => {
        setState({type: 'setChoosenCriteria', choosenCriteria: props.choosenCriteria })
    }, [props.choosenCriteria]);
    

    const isCriterionChoosen = (index, key) => {
        let choosenCriteria = state.choosenCriteria
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
        const id = target.id
        
        if(target.tagName === "BUTTON" && id != "submit-button" && id != "remove-button"){
            const keyId = target.id.split('-')
            const key = keyId[0]
            const id = parseInt(keyId[1])
            const name = target.textContent

            const finded = isCriterionChoosen(id, key)

            if(finded) {
                setState({ type: 'removeCriterion', data: {key, id}})
            }else{
                setState({ type: 'addCriterion', data: {key, id, name}})
            }
        }
    }

    const handleAgeCriterionChange = (value) => {
        setAgeRange(value)
        setState({type: 'addAgeCriterion', data: {key: "ages", name: value}})
    }

    const handleSubmit = () => {
        let choosenCriteria = state.choosenCriteria
        props.getPsysByCriteria(choosenCriteria)
        props.addCriteria(choosenCriteria)
    }

    const handleRemove = () => {
        props.removeCriteria()
        setAgeRange([ageMin, ageMax])
        setState({type: 'setChoosenCriteria', choosenCriteria: props.choosenCriteria })
    }

    const setClassName = (index, key) => {
        if (state.choosenCriteria[key].length === 0){
            return "btn btn-outline-secondary"
        }

        const finded = isCriterionChoosen(index, key)

        return (finded ? "btn btn-outline-primary" : "btn btn-outline-secondary")
    }

    return (
        <div onClick={handleCriterionClick}>
            <div>
            <button id="remove-button" className='btn btn-warning' onClick={handleRemove}>
                Reset filters
            </button>
            </div>
            { 
            Object.keys(state.criteriaNames).map((k, i) => (
                <>
                <div>
                    <label className="control-label">
                        {criteriaNamesText[i]}
                    </label>
                </div>
                <div id={k} >
                    <div class="form-group">
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
                </>
            ))
            }
            <div className="form-group form-submit">
            <button id="submit-button" className='btn btn-primary' onClick={handleSubmit}>
                Apply
            </button>
            </div>
        </div>
    )
}

export default CriteriaPsy;
