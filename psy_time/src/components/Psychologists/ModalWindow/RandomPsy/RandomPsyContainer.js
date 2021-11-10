import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { getRandomPsyUserProfile }  from '../../../../redux/psy-profiles-reducer';
import RandomPsy from './RandomPsy'


class RandomPsyContainer extends Component {
    componentDidMount(){
        this.props.getRandomPsyUserProfile()
    }

    getRandomPsyUserProfile() {
        this.props.getRandomPsyUserProfile()
    }

    render() {
        return <>
        { this.props.randomProfile
            ? <RandomPsy
                random_profile={this.props.randomProfile}
                getRandomPsyUserProfile={this.props.getRandomPsyUserProfile} />
            : null
        }
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        randomProfile: state.psychologistsPage.randomProfile,
    }
}


export default connect(mapStateToProps, { getRandomPsyUserProfile })(RandomPsyContainer)
