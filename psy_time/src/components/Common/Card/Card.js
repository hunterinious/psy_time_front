import React from 'react';
import cn from 'classnames';
import styles from './Card.module.scss';

const Card = (props) => {
    const {title, text, className} = props
    const cardClassName = className ? cn(styles.CardContainer, className) : styles.CardContainer
    
    return (
        <div className={cardClassName}>
            <div className={styles.Card}>
                <h5 className={styles.CardTitle}>{title}</h5>
                <p className={styles.CardText}>
                    {text}
                </p>   
            </div>         
        </div>
    );
};


export default Card;