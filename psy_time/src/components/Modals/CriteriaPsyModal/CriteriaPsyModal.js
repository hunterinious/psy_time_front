import React from 'react';
import Modal from '../../Common/Modal/Modal'
import CriteriaPsyContainer from '../../Psychologists/ModalWindow/CriteriaPsy/CriteriaPsyContainer';


const CriteriaPsyModal = (props) => {
    const {hideModal, contentClassName} = props

    return (
        <Modal headerTitle='Filtering' hideModal={hideModal} contentClassName={contentClassName}>
            <CriteriaPsyContainer {...props} />
        </Modal>
    )
};


export default CriteriaPsyModal;