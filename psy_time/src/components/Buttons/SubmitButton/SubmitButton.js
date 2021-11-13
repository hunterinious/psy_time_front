import React from 'react';
import cn from 'classnames';
import styles from './SubmitButton.module.scss';
import Button from '../Button/Button';

const SubmitButton = (props) => {
    const {onClick, className, ...restProps} = props
    const buttonClassName = className ? cn(styles.SubmitButton, className) : styles.SubmitButton
    
    return (
        <>
            <Button className={buttonClassName} onClick={onClick} {...restProps}></Button>
        </>
    );
};


export default SubmitButton;