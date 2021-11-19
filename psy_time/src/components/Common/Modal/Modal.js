import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import styles from './Modal.module.scss';


const Modal = (props) => {
    const {hideModal, headerTitle, className, contentClassName, children} = props
    const [modalClassName, setModalClassName] = useState(className ? cn(styles.Modal, className) : styles.Modal)

    useEffect(() => {
        const cns = className ? cn(styles.Modal, styles.ModalFade, className) : cn(styles.Modal, styles.ModalFade)
        setModalClassName(cns)
    }, []);


    return (
        <div className={"modal " + modalClassName} tabIndex="-1">
            <div className={'modal-dialog ' + styles.ModalDialog}>
                <div className={"modal-content " + contentClassName}>
                    <div className="modal-header">
                        <h5 className="modal-title">{headerTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hideModal}></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
};


export default Modal;