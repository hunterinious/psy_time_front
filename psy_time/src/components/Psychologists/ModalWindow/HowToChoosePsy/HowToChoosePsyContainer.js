import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux'; 
import { getHowToChoosePsy }  from '../../../../redux/how-to-choose-psy-reducer';
import HowToChoosePsy from './HowToChoosePsy';


class HowToChoosePsyContainer extends Component {
    componentDidMount(){
        this.props.getHowToChoosePsy()
    }

    render() {
        return (
            <div className="container">
                <HowToChoosePsy
                text={this.props.howToChoosePsyText}
                handleClose={this.props.handleClose}
                />
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        howToChoosePsyText: state.howToChoosePsy.howToChoosePsyText
    }
}


export default connect(mapStateToProps, { getHowToChoosePsy })(HowToChoosePsyContainer)

