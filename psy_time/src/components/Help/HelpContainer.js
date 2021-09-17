import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'; 
import { getCountries }  from '../../redux/locations-reducer';
import Preloader from '../Common/Preloader/Preloader';
import Help from './Help';

class HelpContainer extends Component {
    componentDidMount() {
        this.props.getCountries()
    }

    render() {
        return <>
            { this.props.countriesAreFetching 
                ? <Preloader />
                : <Help
                    countries={this.props.countries}
                    helpToChoose={true}
                    handleClose={this.props.handleClose}
                   />
            }
        </>
    }
}


let mapStateToProps = (state) => {
    return {
        countries: state.countries.countries,
        countriesAreFetching: state.countries.countriesAreFetching
    }
}


export default compose(
    connect(mapStateToProps, { getCountries })
)(HelpContainer)


