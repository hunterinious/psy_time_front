import React, { Component } from 'react';
import Buttons from './Buttons'


class CriteriaPsy extends Component {
    constructor(props){
      super(props)
      this.state = {
        criteriaNames: this.props.criteriaNames,
        choosenCriteria: this.props.choosenCriteria,
        criteriaNamesText: ["Gender", "Status", "Formats", "Work with themes", 
                        "Approaches used", "Specializations", "Educations",
                        "Secondary educations", "Languages"]
      }
      this.isCriterionChoosen = this.isCriterionChoosen.bind(this)
      this.setLocalCriteria = this.setLocalCriteria.bind(this)
      this.setClassName = this.setClassName.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleRemove = this.handleRemove.bind(this)
      this.handleCriterionClick = this.handleCriterionClick.bind(this)

    }

    componentDidUpdate(prevProps, prevState) {
      if(prevProps.choosenCriteria !== this.props.choosenCriteria) {
          this.setState(({
            choosenCriteria: this.props.choosenCriteria
          }))
      }
      if(prevProps.criteriaNames !== this.props.criteriaNames) {
          this.setState(({
            criteriaNames: this.props.criteriaNames
          }))
    }
    }

    isCriterionChoosen(index, key) {
      let finded = false
      if (this.state.choosenCriteria[key]){
          this.state.choosenCriteria[key].forEach(c => {
            if(c[0] === index){
              finded = true
            }
          });
      }

      return finded
    }

    handleSubmit() {
      let choosenCriteria = this.state.choosenCriteria
      this.props.getPsysByCriteria(choosenCriteria)
      this.props.addCriteria(choosenCriteria)
    }
 
    handleCriterionClick(e) {
        const target = e.target
        const id = target.id
        
        if(target.tagName === "BUTTON" && id != "submit-button" && id != "remove-button"){
          const keyId = target.id.split('-')
          const key = keyId[0]
          const id = parseInt(keyId[1])
          const name = target.textContent

          const finded = this.isCriterionChoosen(id, key)

          this.setLocalCriteria(finded, key, id, name)
        }
    }

    handleRemove() {
      this.props.removeCriteria()
    }

    setLocalCriteria(finded, key, id, name){
      if(finded){
        this.setState({
          choosenCriteria: {
            ...this.state.choosenCriteria,
            [key]: [
                ...this.state.choosenCriteria[key]
                .filter(e => e[0] !== id)
            ]
          }
        })
      }else {
        this.setState({
          choosenCriteria: {
            ...this.state.choosenCriteria,
            [key]: [
                ...this.state.choosenCriteria[key],
                [ id, name ]
            ]
          }
        })
      }
    }

    setClassName(index, key) {
      if (this.state.choosenCriteria[key].length === 0){
        return "btn btn-outline-secondary"
      }

      const finded = this.isCriterionChoosen(index, key)

      return (finded ? "btn btn-outline-primary" : "btn btn-outline-secondary")
    }

    render(){
      return (
        <div onClick={this.handleCriterionClick}>
          <div>
            <button id="remove-button" className='btn btn-warning' onClick={this.handleRemove}>
              Reset filters
            </button>
          </div>
          { 
            Object.keys(this.state.criteriaNames).map((k, i) => (
              <>
                <div>
                  <label className="control-label">
                    {this.state.criteriaNamesText[i]}
                  </label>
                </div>
                <div id={k} >
                    <div class="form-group">
                      <Buttons criteria={this.state.criteriaNames} itemsKey={k}
                              setClassName={this.setClassName}
                              />
                    </div>
                </div>
              </>
            ))
          }
          <div className="form-group form-submit">
            <button id="submit-button" className='btn btn-primary' onClick={this.handleSubmit}>
              Apply
            </button>
          </div>
        </div>
      )
    }
}

export default CriteriaPsy;
