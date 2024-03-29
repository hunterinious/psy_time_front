import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCitiesWithCountry } from '../../../redux/locations-reducer';
import Profile from './Profile'


class PsyProfileContainer extends Component {
    componentDidMount(){
        this.props.getCitiesWithCountry()
    }

    render () {
        const {user, cities, countries, timezones, updateProfile} = this.props

        if(!this.props.countriesAreFetching && !this.props.citiesAreFetching){
            return (
                <>
                    <Profile 
                        user={user}
                        cities={cities}
                        countries={countries}
                        timezones={timezones}
                        updateProfile={updateProfile}
                    />
                </>
            );
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