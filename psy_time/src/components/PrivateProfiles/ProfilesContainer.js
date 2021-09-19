import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUserProfile, setUserProfile } from '../../redux/private-profile-reducer';
import { getTimezones } from '../../redux/locations-reducer';
import Preloader from '../Common/Preloader/Preloader';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import PsyProfileContainer from './Psychologist/PsyProfileContainer';
import RegularProfileContainer from './Regular/RegularProfileContainer';

class ProfilesContainer extends Component {
    componentDidMount(){
        this.props.getUserProfile(this.props.profileId, this.props.userType)
        this.props.getTimezones()
    }

    render() {
        const { profile, timezones, timezonesAreFetching, userType, setUserProfile } = this.props

        return (
            <>
            {
             profile && !timezonesAreFetching
                ?
                <div>
                    { userType === 'R' 
                    ? 
                    (
                    <RegularProfileContainer
                        profile={profile}
                        timezones={timezones}
                        setUserProfile={setUserProfile}/>
                    )
                    :
                    <PsyProfileContainer
                        profile={profile}
                        timezones={timezones}
                        setUserProfile={setUserProfile}/>
                    
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
