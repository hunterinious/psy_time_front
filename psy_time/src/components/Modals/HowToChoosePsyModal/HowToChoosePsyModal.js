import React from 'react';
import Modal from '../../Common/Modal/Modal'
import HowToChoosePsy from '../../Psychologists/HowToChoosePsy/HowToChoosePsy';


const HowToChoosePsyModal = (props) => {
    const {hideModal, contentClassName} = props

    return (
        <Modal headerTitle='How To Choose Therapist' hideModal={hideModal} contentClassName={contentClassName}>
            <HowToChoosePsy {...props} hideModal={hideModal}/>
        </Modal>
    )
};


export default HowToChoosePsyModal;