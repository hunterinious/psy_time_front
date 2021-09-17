import React, { Component } from 'react';
import Profile from './Profile'

class RegContainer extends Component {
    render () {
        return (
            <div>
                <Profile 
                    profile={this.props.profile} 
                    timezones={this.props.timezones}
                    setUserProfile={this.props.setUserProfile}/>
            </div>
        );
    }
};

export default RegContainer;