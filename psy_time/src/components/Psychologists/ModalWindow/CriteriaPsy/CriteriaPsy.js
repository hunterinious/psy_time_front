import React, { Component, useState } from 'react';
import Button from './Button'


const CriteriaPsy = (props) => {
    let criteria = props.criteria
    let choosenCriteria = props.choosenCriteria
    const criteriaNames = ["Gender", "Status", "Formats", "Work with themes", 
                           "Approaches used", "Specializations", "Educations",
                           "Secondary educations", "Languages"]

    const isCriterionChoosen = (index, key) => {
      let finded = false
      choosenCriteria[key].forEach(c => {
        if(c[0] === index){
          finded = true
        }
      });

      return finded
    }

    const handleSubmit = () => {
      this.props.getPsysByCriteria(choosenCriteria)
    }
 
    const handleCriterionClick = (e) => {
        const target = e.target
        
        if (target.tagName === "BUTTON"){
          const keyId = target.id.split('-')
          const key = keyId[0]
          const id = parseInt(keyId[1])
          const name = target.textContent

          const finded = isCriterionChoosen(id, key)

          return (finded ? props.removeCriterion(key, id, name) : props.addCriterion(key, id, name))
        }
    }

    const setClassName = (index, key) => {
      if (choosenCriteria[key].length === 0){
        return "btn btn-outline-secondary"
      }

      const finded = isCriterionChoosen(index, key)

      return (finded ? "btn btn-outline-primary" : "btn btn-outline-secondary")
    }


    return (
      <div>
        { 
          Object.keys(criteria).map((k, i) => (
            <>
              <div className="row">
                { criteriaNames[i] }
              </div>
              <div id="genders" className="row mb-2">
                  <Button criteria={criteria} itemsKey={k}
                          handleCriterionClick={handleCriterionClick}
                          setClassName={setClassName}
                          />
              </div>
            </>
          ))
        }
        <div className="row">
          <button onClick={handleSubmit}>
            Apply
          </button>
        </div>
      </div>
    )
}

export default CriteriaPsy;
