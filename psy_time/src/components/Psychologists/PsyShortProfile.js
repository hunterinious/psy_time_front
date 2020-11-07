import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Psychologists.module.css';


const PsyProfiles = (props) => {
    const statuses_length = props.statuses.length

    return <div className={"mx-3 my-3"}>
        <div>
            <NavLink to={'/public-profile/' + props.id}>
                <img src={props.avatar} className={styles.userPhoto}/>    
            </NavLink>
        </div>
        <div>
            {props.first_name + " " + props.last_name}
        </div>
        <div>
        {props.statuses.map((st, i) => (
            statuses_length - 1 == i ? st.name : st.name + ", " 
        ))}
        </div>
    </div>   
    
}

export default PsyProfiles;
