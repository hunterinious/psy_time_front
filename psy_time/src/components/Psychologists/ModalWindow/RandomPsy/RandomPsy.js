import React from 'react';
import Avatar from '../../../Common/Avatar/Avatar';
import Button from '../../../Common/Buttons/Button/Button';
import styles from './RandomPsy.module.scss';
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
        <div className={styles.RandomPsy}>
            <Avatar 
                onClick={onAvatarClick}
                src={profile.avatar}
                className={styles.userPhoto}
                alt='therapist avatar'
            /> 
            <div className={styles.RandomPsyText}>
                {profile.name}
            </div>
            <Button className={styles.RandomPsyButton} onClick={handleGetRandom}>
                Try again
            </Button>
        </div>
    )
}

export default RandomPsy;
