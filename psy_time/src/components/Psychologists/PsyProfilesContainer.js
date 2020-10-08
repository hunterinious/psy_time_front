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


class PsyProfilesContainer extends Component {
    constructor(props) {
        super()
        this.state = {show: false, currentSectionId: null}
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.renderModalWindowComponent = this.renderModalWindowComponent.bind(this)
    }

    componentDidMount() {
        this.props.getPsyUsersProfiles()
    }

    handleOpen(e){
        this.setState({
            show: true,
            currentSectionId: e.target.id
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
            case 'helpToChoosePsy':
                return undefined
            case 'criteriaPsy':
                return <CriteriaPsyContainer handleClose={this.handleClose}/>
          }
    }

    render() {
        return <>
            { this.props.profilesIsFetching ? <Preloader /> : null}
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
                                <a id='helpToChoosePsy' className="nav-link">Link</a>
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

            <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
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
        profilesIsFetching: state.psychologistsPage.profilesIsFetching,
        profilesNotFound: state.psychologistsPage.profilesNotFound
    }
}

export default compose(
    connect(mapStateToProps, {getPsyUsersProfiles})
)(PsyProfilesContainer)


