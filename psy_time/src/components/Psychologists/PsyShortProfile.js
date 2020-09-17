import React, { Component } from 'react';
import styles from './Psychologists.module.css';


const PsyProfiles = (props) => {
    let statuses_length = props.statuses.length

    return <div className={styles.profilesMargin}>
        <div>
            <img src={props.avatar} className={styles.userPhoto}/>    
        </div>
        <div>
            {props.user.username}
        </div>
        <div>
        {props.statuses.map((st, i) => (
            statuses_length - 1 == i ? st.name : st.name + ", " 
        ))}
        </div>
    </div>   
    
}

export default PsyProfiles;
