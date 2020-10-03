import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux'; 
import { getHowToChoosePsy }  from '../../../../redux/psy-profiles-reducer';
import HowToChoosePsy from './HowToChoosePsy';


class HowToChoosePsyContainer extends Component {
    componentDidMount(){
        this.props.getHowToChoosePsy()
    }

    render() {
        return (
            <div className="container">
                <HowToChoosePsy text={this.props.howToChoosePsyText} />
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        howToChoosePsyText: state.psychologistsPage.howToChoosePsyText
    }
}


export default compose(
    connect(mapStateToProps, { getHowToChoosePsy })
)(HowToChoosePsyContainer)

