import React from 'react';
import Modal from '../../Common/Modal/Modal'
import Login from '../../Authentication/Login/Login';

const LoginModal = (props) => {
    const {hideModal, contentClassName} = props

    return (
        <Modal headerTitle='Login' hideModal={hideModal} contentClassName={contentClassName}>
            <Login {...props} hideModal={hideModal}/>
        </Modal>
    )
};


export default LoginModal;