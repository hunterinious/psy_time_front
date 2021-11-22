import React from 'react';
import modalTypes from '../../../consts/app/modalTypes';
import Avatar from '../../Common/Avatar/Avatar';
import Button from '../../Common/Buttons/Button/Button';
import useModal from '../../../hooks/useModal';
import styles from './PsyPublicProfile.module.scss';


const PsyPublicProfile = (props) => {
    const {showModal} = useModal(modalTypes.APPOINTMENT_MODAL)
    const {profile} = props
    const statuses = profile.statuses
    const statusesLength = statuses.length

    return (
        <div className={styles.PsyPublicProfile}>
            <div className={styles.PsyPublicProfileInfo}>
                <Avatar
                    src={profile.avatar}
                    alt='therapist avatar'
                />
                <div className={styles.PsyPublicProfileInfoBase}>
                    <div className={styles.PsyPublicProfileInfoBaseName}>
                        {profile.name}
                    </div>
                    <div className={styles.PsyPublicProfileInfoBaseStatus}>
                        {profile.statuses.map((st, i) => (
                            statusesLength - 1 === i ? st.name : st.name + ", " 
                        ))}
                    </div>
                    <div className={styles.PsyPublicProfileInfoBasePrice}>
                        <span>{profile.duration}</span>$/
                        <span>{profile.price}</span>min
                    </div>
                    <Button className={styles.PsyPublicProfileAppoinmentButton} onClick={showModal}>
                        <span>Make appointment</span>
                    </Button>
                </div>
            </div>
            <div className={styles.PsyPublicProfileInfoAbout}>
                <p className={styles.PsyPublicProfileInfoAboutTitle}>About</p>
                <p className={styles.PsyPublicProfileInfoAboutText}>{profile.about}</p>
            </div>
        </div>
    )
   
}

export default PsyPublicProfile;
