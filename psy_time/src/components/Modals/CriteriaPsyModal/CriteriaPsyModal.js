import React from 'react';
import cn from 'classnames';
import Modal from '../../Common/Modal/Modal'
import CriteriaPsyContainer from '../../Psychologists/CriteriaPsy/CriteriaPsyContainer';
import styles from './CriteriaPsyModal.module.scss';


const CriteriaPsyModal = (props) => {
    const {hideModal, contentClassName} = props
    const modalClassName = contentClassName 
        ? cn(styles.CriteriaModal, contentClassName) : styles.CriteriaModal

    return (
        <Modal headerTitle='Filtering' hideModal={hideModal} contentClassName={modalClassName}>
            <CriteriaPsyContainer {...props} />
        </Modal>
    )
};


export default CriteriaPsyModal;