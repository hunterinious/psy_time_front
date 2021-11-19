import React from 'react';
import Modal from '../../Common/Modal/Modal'
import HelpContainer from '../../Help/HelpContainer';


const HelpModal = (props) => {
    const {hideModal, contentClassName} = props

    return (
        <Modal headerTitle='Help in choosing' hideModal={hideModal} contentClassName={contentClassName}>
            <HelpContainer {...props} />
        </Modal>
    )
};


export default HelpModal;