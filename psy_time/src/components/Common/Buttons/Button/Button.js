import React from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';


const Button = (props) => {
    const {onClick, className, children, type} = props
    const buttonClassName = className ? cn(styles.Button, className) : styles.Button
    
    return (
        <>
            <button className={buttonClassName} onClick={onClick} type={type}>
                {children}
            </button>
        </>
    );
};


export default Button;