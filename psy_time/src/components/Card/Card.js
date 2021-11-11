import React from 'react';
import styles from './Card.module.scss';

const Card = (props) => {
    const {title, text} = props

    return (
        <div className={styles.CardContainer}>
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