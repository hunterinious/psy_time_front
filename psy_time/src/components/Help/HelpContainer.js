import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'; 
import { getCountries }  from '../../redux/locations-reducer';
import Help from './Help';

class HelpContainer extends Component {
    componentDidMount() {
        this.props.getCountries()
    }

    render() {
        const {countries, handleClose, ...rest} = this.props
        return <>
            { !this.props.countriesAreFetching &&
                <Help
                    countries={countries}
                    helpToChoose={true}
                    handleClose={handleClose}
                    {...rest}
                />
            }
        </>
    }
}


let mapStateToProps = (state) => {
    return {
        countries: state.locations.countries,
        countriesAreFetching: state.locations.countriesAreFetching
    }
}


export default compose(
    connect(mapStateToProps, { getCountries })
)(HelpContainer)


