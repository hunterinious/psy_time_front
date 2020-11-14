import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../Psychologists.module.css';

const RandomPsy = (props) => {
    const profile = props.random_profile
    
    const handleGetRandom = () => {
        props.getRandomPsyUserProfile()
    }

    return (
        <div>
            <div>
                <NavLink to={'/public-profile/' + profile.id}>
                    <img src={profile.avatar} className={styles.userPhoto}/>   
                </NavLink> 
            </div>
            <div>
                {profile.name}
            </div>
            <div>
                <button className="btn btn-warning" onClick={handleGetRandom}>
                    Try again
                </button>
            </div>
        </div>
    )
}

export default RandomPsy;
