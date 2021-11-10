import React from 'react';
import cn from 'classnames';
import styles from './CloseButton.module.scss';

const CloseButton = (props) => {
    const {className, onClick} = props
    const buttonClassName = className ? cn(styles.CloseButton, className) : styles.CloseButton

    return (
        <>
            <button type="button" aria-label="Close" className={buttonClassName} onClick={onClick}>
                <span aria-hidden="true">×</span>
            </button>
        </>
    );
};

export default CloseButton;