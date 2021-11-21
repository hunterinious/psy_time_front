import React from 'react';
import {connect} from 'react-redux';
import LoginModal from './LoginModal/LoginModal';
import AppointmentModal from './AppointmentModal/AppointmentModal';
import CriteriaPsyModal from './CriteriaPsyModal/CriteriaPsyModal';
import HowToChoosePsyModal from './HowToChoosePsyModal/HowToChoosePsyModal';
import RandomPsyModal from './RandomPsyModal/RandomPsyModal';
import HelpModal from './HelpModal/HelpModal';
import modalTypes from '../../consts/app/modalTypes';
import modalService from '../../services/modalService';


const MODAL_COMPONENTS = {
    [modalTypes.LOGIN_MODAL]: LoginModal,
    [modalTypes.APPOINTMENT_MODAL]: AppointmentModal,
    [modalTypes.HOW_TO_CHOOSE_PSY_MODAL]: HowToChoosePsyModal,
    [modalTypes.CRITERIA_PSY_MODAL]: CriteriaPsyModal,
    [modalTypes.RANDOM_PSY_MODAL]: RandomPsyModal,
    [modalTypes.HELP_MODAL]: HelpModal
};

const ModalRoot = (props) => {
    const modal = props.modal

    if (!modal) return null

    const {modalType, modalProps} = modal;
    const SpecificModal = MODAL_COMPONENTS[modalType];

    const hideModal = () => {
        const {onModalClose, modal} = props

        if(onModalClose) onModalClose()

        modalService.hideModal(modal.modalType)
    }


    return (
        <>
            {SpecificModal ? (
                <SpecificModal key={modalType} {...modalProps} hideModal={hideModal} modalType={modalType}/>
            ) : null}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        modal: state.app.modal
    }                                           
}

export default connect(mapStateToProps, {})(ModalRoot);