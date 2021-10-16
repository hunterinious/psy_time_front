import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Psychologists.module.css';
import * as routePaths from '../../consts/routePaths'


const PsyProfiles = (props) => {
    const statuses_length = props.statuses.length

    return <div className={"mx-3 my-3"}>
        <div>
            <Link to={routePaths.PSY_PUBLIC_PROFILE + `/${props.id}`}>
                <img src={props.avatar} className={styles.userPhoto}/>    
            </Link>
        </div>
        <div>
            {props.name}
        </div>
        <div>
        {props.statuses.map((st, i) => (
            statuses_length - 1 == i ? st.name : st.name + ", " 
        ))}
        </div>
    </div>   
    
}

export default PsyProfiles;
