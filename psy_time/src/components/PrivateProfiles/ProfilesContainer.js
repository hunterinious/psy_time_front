import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUserProfile, updatePrivateRegularUserProfile, updatePrivatePsyUserProfile } from '../../redux/private-profile-reducer';
import { getTimezones } from '../../redux/locations-reducer';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import PsyProfileContainer from './Psychologist/PsyProfileContainer';
import RegularProfileContainer from './Regular/RegularProfileContainer';

class ProfilesContainer extends Component {
    componentDidMount(){
        const props = this.props
        props.getUserProfile({id: props.userId, userType: props.userType})
        props.getTimezones()
    }

    render() {
        const { profile: user, timezones, timezonesAreFetching, userType, updatePrivateRegularUserProfile, updatePrivatePsyUserProfile } = this.props

        return (
            <>
            {
             user && !timezonesAreFetching &&
                <div>
                    { userType === 'R' 
                    ?
                    <RegularProfileContainer
                        user={user}
                        timezones={timezones}
                        updateProfile={updatePrivateRegularUserProfile}/>
                    :
                    <PsyProfileContainer
                        user={user}
                        timezones={timezones}
                        updateProfile={updatePrivatePsyUserProfile}/>
                    }
                </div>                
            }
            </>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        profile: state.profile.profile,
        userId: state.auth.userId,
        userType: state.auth.userType,
        timezones: state.locations.timezones,
        timezonesAreFetching: state.locations.timezonesAreFetching
    }
}

export default compose(
    connect(mapStateToProps, { getUserProfile, updatePrivateRegularUserProfile, updatePrivatePsyUserProfile, getTimezones }),
    withAuthRedirect
)
(ProfilesContainer)
