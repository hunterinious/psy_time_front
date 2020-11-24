import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getPsyExtendedPublicProfile } from '../../../../redux/psy-profiles-reducer';
import ExtendedProfile from './ExtendedProfile';

class ExtendedProfileContainer extends Component {
    componentDidMount(){
        this.props.getPsyExtendedPublicProfile(this.props.paramId)
    }

    render() {
        return (
            <>
            { this.props.profile
                ? <ExtendedProfile profile={this.props.profile} />
                : null
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