import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Psychologists.module.scss';
import appRouterService from '../../services/appRouterService';


const PsyProfiles = (props) => {
    const statuses_length = props.statuses.length

    const onAvatarClick = () => {
        appRouterService.forwardToPsyPublicProfilePage(props.id)
    }

    return <div className={"mx-3 my-3"}>
        <div>
            <Link onClick={onAvatarClick}>
                <img src={props.avatar} className={styles.userPhoto} alt='therapist avatar'/>    
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
