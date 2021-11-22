import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPsyExtendedPublicProfile } from '../../../../redux/psy-profiles-reducer';
import Preloader from '../../../Common/Preloader/Preloader';
import ExtendedProfile from './ExtendedProfile';

class ExtendedProfileContainer extends Component {
    componentDidMount(){
        this.props.getPsyExtendedPublicProfile({id: this.props.publicProfileId})
    }

    render() {
        return (
            <>
                {this.props.profile 
                    ? <ExtendedProfile profile={this.props.profile} />
                    : <Preloader />
                }
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.psychologistsPage.extendedPublicProfile,
    }
}

export default connect(mapStateToProps, { getPsyExtendedPublicProfile })(ExtendedProfileContainer)