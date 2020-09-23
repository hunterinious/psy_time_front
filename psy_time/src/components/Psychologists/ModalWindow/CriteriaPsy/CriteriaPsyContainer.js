import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getCriteriaPsys, addCriterion, removeCriterion } from '../../../../redux/psy-profiles-reducer';
import Preloader from '../../../Common/Preloader/Preloader';
import CriteriaPsy from './CriteriaPsy';


class CriteriaPsyContainer extends Component {
    constructor(props){
        super(props)
        this.addCriterion = this.addCriterion.bind(this)
        this.removeCriterion = this.removeCriterion.bind(this)
        this.getPsysByCriteria = this.getPsysByCriteria.bind(this)
        
    }

    componentDidMount(){
        // console.log(this.props.criteria, this.props.isFetching)
        this.props.getCriteriaPsys()
    }

    componentDidUpdate(){
        // console.log(this.props.criteria, this.props.isFetching)
    }

    addCriterion(key, id, name){
        this.props.addCriterion(key, id, name)
    }

    removeCriterion(key, id){
        this.props.removeCriterion(key, id)
    }

    getPsysByCriteria(values){
        this.props.getPsysByCriteria(values)
    }

    render() {
        return <>
            { this.props.criteriaIsFetching
             ? <Preloader /> 
             : <CriteriaPsy
                criteria={this.props.criteria}
                choosenCriteria={this.props.choosenCriteria}
                addCriterion={this.addCriterion}
                removeCriterion={this.removeCriterion}
                getPsysByCriteria={this.getPsysByCriteria}/>
             }
            
        </>
    }
}


let mapStateToProps = (state) => {
    return {
        criteriaIsFetching: state.psychologistsPage.criteriaIsFetching,
        criteria: state.psychologistsPage.criteria,
        choosenCriteria: state.psychologistsPage.choosenCriteria
    }
}

export default compose(
    connect(mapStateToProps, { getCriteriaPsys, addCriterion, removeCriterion })
)(CriteriaPsyContainer)


