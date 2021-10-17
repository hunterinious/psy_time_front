import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Psychologists.module.css';
import * as routePaths from '../../../../consts/routePaths'
import appRouterService from '../../../../services/appRouterService';

const RandomPsy = (props) => {
    const profile = props.random_profile
    
    const handleGetRandom = () => {
        props.getRandomPsyUserProfile()
    }

    const onAvatarClick = () => {
        appRouterService.forwardToPsyPublicProfilePage(profile.id)
    }

    return (
        <div>
            <div>
                <Link onClick={onAvatarClick}>
                    <img src={profile.avatar} className={styles.userPhoto}/>   
                </Link> 
            </div>
            <div className='mb-3'>
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
