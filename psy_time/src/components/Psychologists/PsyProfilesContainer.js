import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { getPsyUsersProfiles } from '../../redux/psy-profiles-reducer';
import Preloader from '../Common/Preloader/Preloader';
import PsyProfiles from './PsyProfiles';
import CriteriaPsyContainer from './ModalWindow/CriteriaPsy/CriteriaPsyContainer';
import HowToChoosePsyContainer from './ModalWindow/HowToChoosePsy/HowToChoosePsyContainer';
import RandomPsyContainer from './ModalWindow/RandomPsy/RandomPsyContainer';
import HelpContainer from '../Help/HelpContainer';


const HOW_TO_CHOOSE_PSY = 'HOW_TO_CHOOSE_PSY';
const CRITERIA_PSY = 'CRITERIA_PSY'
const RANDOM_PSY = 'RANDOM_PSY';
const HELP = 'HELP';


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

    getHeaderText(id) {
        let text = ''

        switch(id) {
            case HOW_TO_CHOOSE_PSY:
                text = 'How To Choose Psychologist'
                break;
            case  RANDOM_PSY:
                text = 'Random Psychologist'
                break;
            case HELP:
                text = 'Help in choosing'
                break;
            case CRITERIA_PSY:
                text = 'Filtering'
                break;
        }

        return text
    }

    handleOpen = (e) => {
        const id = e.target.id
        const text = this.getHeaderText(id)

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
            case HOW_TO_CHOOSE_PSY:
                return <HowToChoosePsyContainer handleClose={this.handleClose}/>
            case RANDOM_PSY:
                return <RandomPsyContainer/>
            case HELP:
                return <HelpContainer handleClose={this.handleClose}/>
            case CRITERIA_PSY:
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
                                <a id={HOW_TO_CHOOSE_PSY} className="nav-link">How to choose Psychologist</a>
                            </li>
                            <li className="nav-item">
                                <a  id={RANDOM_PSY} className="nav-link">Random Psychologist</a>
                            </li>
                            <li className="nav-item">
                                <a id={HELP} className="nav-link">Help in Choosing</a>
                            </li>
                            <li className="nav-item">
                                <a id={CRITERIA_PSY} className="nav-link">Filter</a>
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

export default connect(mapStateToProps, {getPsyUsersProfiles})(PsyProfilesContainer)


