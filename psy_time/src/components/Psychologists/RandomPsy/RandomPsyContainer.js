import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { getRandomPsyUserProfile }  from '../../../redux/psy-profiles-reducer';
import Preloader from '../../Common/Preloader/Preloader';
import RandomPsy from './RandomPsy'


class RandomPsyContainer extends Component {
    componentDidMount(){
        this.props.getRandomPsyUserProfile()
    }

    getRandomPsyUserProfile() {
        this.props.getRandomPsyUserProfile()
    }

    render() {
        const {randomProfile, getRandomPsyUserProfile, ...rest} = this.props
        return <>
        { randomProfile
            ?
            <RandomPsy
                random_profile={randomProfile}
                getRandomPsyUserProfile={getRandomPsyUserProfile}
                {...rest} />
            : <Preloader />

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
