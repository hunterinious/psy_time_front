import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCitiesWithCountry } from '../../../redux/locations-reducer';
import Preloader from '../../Common/Preloader/Preloader';
import Profile from './Profile'


class PsyProfileContainer extends Component {
    componentDidMount(){
        this.props.getCitiesWithCountry()
    }

    render () {
        const {profile, cities, countries, timezones, setUserProfile} = this.props
        if(!this.props.countriesAreFetching && !this.props.citiesAreFetching){
            return (
                <div>
                    <Profile 
                        profile={profile} 
                        cities={cities}
                        countries={countries}
                        timezones={timezones}
                        setUserProfile={setUserProfile}
                        />
                </div>
            );
        }else {
            return <Preloader />
        }
    }
};

let mapStateToProps = (state) => {
    return {
        countries: state.locations.countries,
        cities: state.locations.cities,
        citiesAreFetching: state.locations.citiesAreFetching,
        countriesAreFetching: state.locations.countriesAreFetching
    }
}

export default connect(mapStateToProps, { getCitiesWithCountry })(PsyProfileContainer)