import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPsysByCriteria, getPsyUsersProfiles } from '../../../../redux/psy-profiles-reducer';
import { 
    setInitialCriteriaPsy,
    changeCriteriaPsy,
    removeCriteriaPsy
 } from '../../../../redux/criteria-reducer';
import Preloader from '../../../Common/Preloader/Preloader';
import CriteriaPsy from './CriteriaPsy';


class CriteriaPsyContainer extends Component {
    constructor(props){
        super(props)
        this.getPsysByCriteria = this.getPsysByCriteria.bind(this)
        this.changeCriteriaPsy = this.changeCriteriaPsy.bind(this)
        this.removeCriteriaPsy = this.removeCriteriaPsy.bind(this)
        this.getPsyUsersProfiles = this.getPsyUsersProfiles.bind(this)
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
        this.getPsyUsersProfiles()
    }

    getPsyUsersProfiles(){
        this.props.getPsyUsersProfiles({pageNumber: 1})
    }

    render() {
        return <>
            { this.props.criteriaAreFetching
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
        criteriaAreFetching: state.criteria.criteriaAreFetching,
        criteriaNames: state.criteria.criteriaNames,
        choosenCriteria: state.criteria.choosenCriteria
    }
}

export default connect(mapStateToProps,
            {   getPsysByCriteria,
                setInitialCriteriaPsy,
                changeCriteriaPsy,
                removeCriteriaPsy,
                getPsyUsersProfiles 
            }
)(CriteriaPsyContainer)
