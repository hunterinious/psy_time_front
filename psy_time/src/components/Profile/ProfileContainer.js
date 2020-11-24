import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUserProfile } from '../../redux/profile-reducer';
import { getCountries }  from '../../redux/countries-reducer';
import Preloader from '../Common/Preloader/Preloader';
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import RegularProfile from './RegularProfile';
import PsychologistProfile from './PsychologistProfile';


class ProfileContainer extends Component {
    componentDidMount(){
        this.props.getUserProfile(this.props.profileId, this.props.userType)
        this.props.getCountries()
    }

    render() {
        const profile = this.props.profile
        const countries = this.props.countries
        const cities = this.props.cities

        return (
            <>
            {
             profile && !this.props.countriesAreFetching
                ?
                <div>
                    { this.props.userType === 'R' 
                    ? 
                    (
                    <RegularProfile profile={profile} countries={countries} cities={cities}/>
                    )
                    :
                    <PsychologistProfile profile={profile} countries={countries} cities={cities} />
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
        countries: state.countries.countries,
        cities: state.countries.cities,
        countriesAreFetching: state.countries.countriesAreFetching
    }
}

export default compose(
    connect(mapStateToProps, { getUserProfile, getCountries }),
    withAuthRedirect
)
(ProfileContainer)
