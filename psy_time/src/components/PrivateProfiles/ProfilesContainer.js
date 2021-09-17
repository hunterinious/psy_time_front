import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUserProfile, setUserProfile } from '../../redux/private-profile-reducer';
import { getTimezones } from '../../redux/locations-reducer';
import Preloader from '../Common/Preloader/Preloader';
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import RegContainer from './Regular/Profile';
import PsyContainer from './Psychologist/Profile';

class ProfilesContainer extends Component {
    componentDidMount(){
        this.props.getUserProfile(this.props.profileId, this.props.userType)
        this.props.getTimezones()
    }

    render() {
        const profile = this.props.profile
        const timezones = this.props.timezones

        return (
            <>
            {
             profile && !this.props.timezonesAreFetching
                ?
                <div>
                    { this.props.userType === 'R' 
                    ? 
                    (
                    <RegContainer profile={profile}
                        timezones={timezones}
                        setUserProfile={this.props.setUserProfile}/>
                    )
                    :
                    <PsyContainer profile={profile}
                        timezones={timezones}
                        setUserProfile={this.props.setUserProfile}/>
                    }
                </div>                
                :
                <Preloader />
            }
            </>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        profileId: state.auth.profileId,
        userType: state.auth.userType,
        timezones: state.locations.timezones,
        timezonesAreFetching: state.locations.timezonesAreFetching
    }
}

export default compose(
    connect(mapStateToProps, { getUserProfile, setUserProfile, getTimezones }),
    withAuthRedirect
)
(ProfilesContainer)
