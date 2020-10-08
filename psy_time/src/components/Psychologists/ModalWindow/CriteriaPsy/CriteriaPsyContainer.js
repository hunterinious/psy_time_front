import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getPsysByCriteria, setInitialCriteriaPsy, changeCriteriaPsy, removeCriteriaPsy } from '../../../../redux/psy-profiles-reducer';
import Preloader from '../../../Common/Preloader/Preloader';
import CriteriaPsy from './CriteriaPsy';


class CriteriaPsyContainer extends Component {
    constructor(props){
        super(props)
        this.getPsysByCriteria = this.getPsysByCriteria.bind(this)
        this.changeCriteriaPsy = this.changeCriteriaPsy.bind(this)
        this.removeCriteriaPsy = this.removeCriteriaPsy.bind(this)
    }

    componentDidMount(){
        this.props.setInitialCriteriaPsy()
    }

    getPsysByCriteria(criteria){
        this.props.getPsysByCriteria(criteria)
    }

    changeCriteriaPsy(criteria){
        this.props.changeCriteriaPsy(criteria)
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
                changeCriteria={this.changeCriteriaPsy}
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
    connect(mapStateToProps, { getPsysByCriteria, setInitialCriteriaPsy, changeCriteriaPsy, removeCriteriaPsy })
)(CriteriaPsyContainer)


