import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getPsysByCriteria, setInitialCriteriaPsy, addCriteriaPsy, removeCriteriaPsy } from '../../../../redux/psy-profiles-reducer';
import Preloader from '../../../Common/Preloader/Preloader';
import CriteriaPsy from './CriteriaPsy';


class CriteriaPsyContainer extends Component {
    constructor(props){
        super(props)
        this.getPsysByCriteria = this.getPsysByCriteria.bind(this)
        this.addCriteriaPsy = this.addCriteriaPsy.bind(this)
        this.removeCriteriaPsy = this.removeCriteriaPsy.bind(this)
    }

    componentDidMount(){
        this.props.setInitialCriteriaPsy()
    }

    getPsysByCriteria(criteria){
        this.props.getPsysByCriteria(criteria)
    }

    addCriteriaPsy(criteria){
        this.props.addCriteriaPsy(criteria)
    }

    removeCriteriaPsy(criteria){
        this.props.removeCriteriaPsy(criteria)
    }

    render() {
        return <>
            { this.props.criteriaIsFetching
             ? <Preloader /> 
             : <CriteriaPsy
                criteriaNames={this.props.criteriaNames}
                choosenCriteria={this.props.choosenCriteria}
                addCriteria={this.addCriteriaPsy}
                removeCriteria={this.removeCriteriaPsy}
                getPsysByCriteria={this.getPsysByCriteria}
                handleClose={this.props.handleClose}/>
            }
        </>
    }
}


let mapStateToProps = (state) => {
    return {
        criteriaIsFetching: state.psychologistsPage.criteriaIsFetching,
        criteriaNames: state.psychologistsPage.criteriaNames,
        choosenCriteria: state.psychologistsPage.choosenCriteria
    }
}

export default compose(
    connect(mapStateToProps, { getPsysByCriteria, setInitialCriteriaPsy, addCriteriaPsy, removeCriteriaPsy })
)(CriteriaPsyContainer)


