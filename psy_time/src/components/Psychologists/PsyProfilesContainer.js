import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { getPsyUsersProfiles } from '../../redux/psy-profiles-reducer';
import Preloader from '../Common/Preloader/Preloader';
import PsyProfiles from './PsyProfiles';
import CriteriaPsyContainer from './ModalWindow/CriteriaPsy/CriteriaPsyContainer';
import HowToChoosePsyContainer from './ModalWindow/HowToChoosePsy/HowToChoosePsyContainer';
import RandomPsyContainer from './ModalWindow/RandomPsy/RandomPsyContainer';
import HelpContainer from '../Help/HelpContainer';


class PsyProfilesContainer extends Component {
    constructor(props) {
        super()
        this.state = {show: false, currentSectionId: null, headerText: ''}
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.renderModalWindowComponent = this.renderModalWindowComponent.bind(this)
    }

    componentDidMount() {
        this.props.getPsyUsersProfiles()
    }

    handleOpen = (e) => {
        let id = e.target.id
        let text = ''
        console.log(e.target.id)
        switch(id) {
            case 'howToChoosePsy':
                text = 'How To Choose Psychologist'
                break;
            case 'randomPsy':
                text = 'Random Psychologist'
                break;
            case 'help':
                text = 'Help in choosing'
                break;
            case 'criteriaPsy':
                text = 'Filtering'
                break;
        }

        this.setState({
            show: true,
            currentSectionId: e.target.id,
            headerText: text
        })
    }

    handleClose() {
        this.setState({
            show: false
        })
    }

    renderModalWindowComponent(sectionId){
        switch(sectionId) {
            case 'howToChoosePsy':
                return <HowToChoosePsyContainer handleClose={this.handleClose}/>
            case 'randomPsy':
                return <RandomPsyContainer/>
            case 'help':
                return <HelpContainer handleClose={this.handleClose}/>
            case 'criteriaPsy':
                return <CriteriaPsyContainer handleClose={this.handleClose}/>
          }
    }

    render() {
        return <>
            { this.props.profilesAreFetching ? <Preloader /> : null}
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <ul className="nav nav-pills flex-column" onClick={this.handleOpen}>
                            <li className="nav-item">
                                <a id='howToChoosePsy' className="nav-link">How to choose Psychologist</a>
                            </li>
                            <li className="nav-item">
                                <a  id='randomPsy' className="nav-link">Random Psychologist</a>
                            </li>
                            <li className="nav-item">
                                <a id='help' className="nav-link">Help in Choosing</a>
                            </li>
                            <li className="nav-item">
                                <a id='criteriaPsy' className="nav-link">Filter</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-10">
                        {this.props.profilesNotFound
                         ? <div>Nothing found matching your criteria</div>
                         : <PsyProfiles profiles={this.props.profiles} /> }
                        
                    </div>
                </div>
            </div>

            <Modal size="lg" show={this.state.show} onHide={this.handleClose} animation={false}>
                <Modal.Header closeButton>
                        <Modal.Title>{this.state.headerText}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { this.renderModalWindowComponent(this.state.currentSectionId) }
                </Modal.Body>
            </Modal>
            
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        profiles: state.psychologistsPage.profiles,
        profilesAreFetching: state.psychologistsPage.profilesAreFetching,
        profilesNotFound: state.psychologistsPage.profilesNotFound
    }
}

export default compose(
    connect(mapStateToProps, {getPsyUsersProfiles})
)(PsyProfilesContainer)


