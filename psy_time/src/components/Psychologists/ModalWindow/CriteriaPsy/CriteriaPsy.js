import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';


const CriteriaPsy = (props) => {
    let criteria = props.criteria
    let choosenCriteria = props.choosenCriteria

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
          <div className="row">
              Gender:
          </div>
          <div id="genders" className="row mb-2">
              {criteria.genders.map((g, index) => (
                  <button 
                    id={`genders-${index}`}
                    onClick={ handleCriterionClick }
                    className={ setClassName(index, "genders") } >
                    {g}
                  </button>
              ))}
          </div>
          <div className="row">
              Status:
          </div>
          <div id="statuses" className="row mb-2">
              {criteria.statuses.map((s, index) => (
                  <button 
                    id={`statuses-${index}`}
                    onClick={ handleCriterionClick }
                    className={ setClassName(index, "statuses") }>
                    {s.name}
                  </button> 
              ))}
          </div>
          <div className="row">
              Format:
          </div>
          <div id="formats" className="row mb-2">
              {criteria.formats.map((f, index) => (
                  <button 
                    id={`formats-${index}`}
                    onClick={ handleCriterionClick }
                    className={ setClassName(index, "formats") }>
                    {f.name}
                  </button> 
              ))}
          </div>
          <div className="row">
              Works with themes:
          </div>
          <div id="themes" className="row mb-2">
              {criteria.themes.map((th, index) => (
                  <button 
                    id={`themes-${index}`}
                    onClick={ handleCriterionClick }
                    className={ setClassName(index, "themes") }>
                    {th.name}
                  </button> 
              ))}
          </div>
          <div className="row">
              Approaches used:
          </div>
          <div id="approaches" className="row mb-2">
              {criteria.approaches.map((a, index) => (
                  <button 
                    id={`approaches-${index}`}
                    onClick={ handleCriterionClick }
                    className={ setClassName(index, "approaches") }>
                    {a.name}
                  </button> 
              ))}
          </div>
          <div className="row">
              Specializations:
          </div>
          <div id="specializations" className="row mb-2">
              {criteria.specializations.map((s, index) => (
                  <button 
                    id={`specializations-${index}`}
                    onClick={ handleCriterionClick }
                    className={ setClassName(index, "specializations") } >
                    {s.name}
                  </button> 
              ))}
          </div>
          <div className="row">
              Education:
          </div>
          <div id="educations" className="row mb-2">
              {criteria.educations.map((e, index) => (
                  <button 
                    id={`educations-${index}`}
                    onClick={ handleCriterionClick }
                    className={ setClassName(index, "educations") } >
                    {e.name}
                  </button> 
              ))}
          </div>
          <div id="secondary_educations" className="row">
              Secondary educations:
          </div>
          <div className="row mb-2">
              {criteria.secondary_educations.map((se, index) => (
                  <button 
                    id={`secondary_educations-${index}`}
                    onClick={ handleCriterionClick }
                    className={ setClassName(index, "secondary_educations") } >
                    {se.name}
                  </button> 
              ))}
          </div>
          <div id="languages" className="row">
              Languages:
          </div>
          <div className="row mb-2">
              {criteria.secondary_educations.map((se, index) => (
                  <button 
                    id={`languages-${index}`}
                    onClick={ handleCriterionClick }
                    className={ setClassName(index, "languages") }>
                    {se.name}
                  </button> 
              ))}
          </div>
          <div className="row">
            <button onClick={handleSubmit}>
                Apply
            </button>
          </div>
      </div>
    )
}

export default CriteriaPsy;
