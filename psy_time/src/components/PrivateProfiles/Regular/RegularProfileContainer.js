import React, { Component } from 'react';
import Profile from './Profile'

class RegularProfileContainer extends Component {
    render () {
        const {user, timezones, updatePrivateRegularUserProfile} = this.props
        return (
            <div>
                <Profile 
                    user={user}
                    timezones={timezones}
                    updatePrivateRegularUserProfile={updatePrivateRegularUserProfile}/>
            </div>
        );
    }
};

export default RegularProfileContainer;