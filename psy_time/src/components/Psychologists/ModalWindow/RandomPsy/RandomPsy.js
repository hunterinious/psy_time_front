import React from 'react';
import Avatar from '../../../Avatar/Avatar';
import styles from '../../Psychologists.module.scss';
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
            <Avatar 
                onClick={onAvatarClick}
                src={profile.avatar}
                className={styles.userPhoto}
                alt='therapist avatar'
            /> 
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
