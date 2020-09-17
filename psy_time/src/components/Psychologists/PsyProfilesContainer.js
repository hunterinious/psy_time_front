import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Preloader from '../Common/Preloader/Preloader'
import PsyProfiles from './PsyProfiles'
import { getPsyUsersProfiles } from '../../redux/psy-profiles-reducer';
import { getIsFetching, getPsychologistsProfiles} from '../../redux/psy-profiles-selectors';


class PsyProfilesContainer extends Component {
  
    componentDidMount() {
        this.props.getPsyUsersProfiles()
     }

    render() {
        return <>
            { this.props.isFetching ? <Preloader /> : null}
            <div class="container">
                <div class="row">
                    <div class="col-2">
                    </div>
                    <div class="col-10">
                        <PsyProfiles profiles={this.props.profiles} />
                    </div>
                </div>
            </div>
            
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        profiles: getPsychologistsProfiles(state),
        isFetching: getIsFetching(state)
    }
}

export default compose(
    connect(mapStateToProps, {getPsyUsersProfiles})
)(PsyProfilesContainer)


