import React from 'react';
import Modal from '../../Common/Modal/Modal'
import Appointment from '../../Appointment/Appointment';


const AppointmentModal = (props) => {
    const {hideModal, contentClassName} = props

    return (
        <Modal headerTitle='Make appointment' hideModal={hideModal} contentClassName={contentClassName}>
            <Appointment {...props} hideModal={hideModal}/>
        </Modal>
    )
};


export default AppointmentModal;