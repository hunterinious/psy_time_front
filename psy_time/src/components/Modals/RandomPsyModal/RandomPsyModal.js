import React from 'react';
import Modal from '../../Common/Modal/Modal'
import RandomPsyContainer from '../../Psychologists/ModalWindow/RandomPsy/RandomPsyContainer';


const RandomPsyModal = (props) => {
    const {hideModal, contentClassName} = props

    return (
        <Modal headerTitle='Random Therapist' hideModal={hideModal} contentClassName={contentClassName}>
            <RandomPsyContainer {...props} />
        </Modal>
    )
};


export default RandomPsyModal;