import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Psychologists.module.css';
import * as routePaths from '../../../../consts/routePaths'

const RandomPsy = (props) => {
    const profile = props.random_profile
    
    const handleGetRandom = () => {
        props.getRandomPsyUserProfile()
    }

    return (
        <div>
            <div>
                <Link to={routePaths.PSY_PUBLIC_PROFILE + `/${profile.id}`}>
                    <img src={profile.avatar} className={styles.userPhoto}/>   
                </Link> 
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
