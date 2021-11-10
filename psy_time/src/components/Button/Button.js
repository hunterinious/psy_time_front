import React from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';


const Button = (props) => {
    const {onClick, className, children} = props
    const buttonClassName = className ? cn(styles.Button, className) : styles.Button
    
    return (
        <>
            <button className={buttonClassName} onClick={onClick}>
                {children}
            </button>
        </>
    );
};


export default Button;