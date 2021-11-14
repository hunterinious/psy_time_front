import React, { Component } from 'react';
import Profile from './Profile'

class RegularProfileContainer extends Component {
    render () {
        const {user, timezones, updateProfile} = this.props
        return (
            <>
                <Profile 
                    user={user}
                    timezones={timezones}
                    updateProfile={updateProfile}
                />
            </>
        );
    }
};

export default RegularProfileContainer;