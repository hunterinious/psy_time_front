import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPsysByCriteria, getPsyUsersProfiles } from '../../../redux/psy-profiles-reducer';
import { 
    setInitialCriteriaPsy,
    changeCriteriaPsy,
    removeCriteriaPsy
 } from '../../../redux/criteria-reducer';
import CriteriaPsy from './CriteriaPsy';
import Preloader from '../../Common/Preloader/Preloader';

class CriteriaPsyContainer extends Component {
    componentDidMount(){
        this.props.setInitialCriteriaPsy()
    }

    getPsysByCriteria = (criteria) => {
        this.props.getPsysByCriteria(criteria)
    }

    changeCriteriaPsy = (criteria) => {
        this.props.changeCriteriaPsy(criteria)
    }

    removeCriteriaPsy = (criteria) => {
        this.props.removeCriteriaPsy(criteria)
        this.getPsyUsersProfiles()
    }

    getPsyUsersProfiles() {
        this.props.getPsyUsersProfiles({pageNumber: 1})
    }

    render() {
        const {criteriaAreFetching, criteriaNames, choosenCriteria, hideModal, ...rest} =  this.props
        return <>
            { criteriaAreFetching 
                ? <Preloader />
                :
                <CriteriaPsy
                    criteriaNames={criteriaNames}
                    choosenCriteria={choosenCriteria}
                    changeCriteria={this.changeCriteriaPsy}
                    removeCriteria={this.removeCriteriaPsy}
                    getPsysByCriteria={this.getPsysByCriteria}
                    hideModal={hideModal}
                    {...rest}
                />
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
