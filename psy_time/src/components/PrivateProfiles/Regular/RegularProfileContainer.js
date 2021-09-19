import React, { Component } from 'react';
import Profile from './Profile'

class RegularProfileContainer extends Component {
    render () {
        const {profile, timezones, setUserProfile} = this.props
        return (
            <div>
                <Profile 
                    profile={profile} 
                    timezones={timezones}
                    setUserProfile={setUserProfile}/>
            </div>
        );
    }
};

export default RegularProfileContainer;