import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { getPsyUsersProfiles } from '../../redux/psy-profiles-reducer';
import Preloader from '../Common/Preloader/Preloader';
import PsyProfiles from './PsyProfiles';
import CriteriaPsyContainer from './ModalWindow/CriteriaPsy/CriteriaPsyContainer'


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
                return 
            case 'randomPsy':
                return
            case 'helpToChoosePsy':
                return
            case 'criteriaPsy':
                return <CriteriaPsyContainer />
          }
    }

    render() {
        return <>
            { this.props.profilesIsFetching ? <Preloader /> : null}
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <ul className="nav flex-column" onClick={this.handleOpen}>
                            <li id='howToChoosePsy' className="nav-item">
                                Домой
                            </li>
                            <li id='randomPsy' className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li id='helpToChoosePsy' className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li id='criteriaPsy' className="nav-item">
                                <a className="nav-link disabled" href="#">Disabled</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-10">
                        <PsyProfiles profiles={this.props.profiles} />
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
        profilesIsFetching: state.psychologistsPage.profilesIsFetching
    }
}

export default compose(
    connect(mapStateToProps, {getPsyUsersProfiles})
)(PsyProfilesContainer)


