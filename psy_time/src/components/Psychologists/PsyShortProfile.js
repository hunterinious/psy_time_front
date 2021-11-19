import React from 'react';
import Button from '../Common/Buttons/Button/Button';
import Avatar from '../Common/Avatar/Avatar';
import styles from './Psychologists.module.scss';
import appRouterService from '../../services/appRouterService';


const PsyShortProfile = (props) => {
    const {id, avatar, price, duration, statuses, themes, name, showAppointmentModal} = props
    const statusesLength = statuses.length

    const forwardToProfile = () => {
        appRouterService.forwardToPsyPublicProfilePage(id)
    }

    const makeAppointment = () => {
        showAppointmentModal({psyId: id})
    }

    return <div className={styles.ShortProfile}>
        <Avatar
            src={avatar}
            alt='therapist avatar'
            containerClassName={styles.ShortProfileAvatarContainer}
            onClick={forwardToProfile}
        />
        <div className={styles.ShortProfileName}>
            {name}
        </div>
        <p className={styles.ShortProfileStatus}>
            {statuses.map((st, i) => (
                statusesLength - 1 === i ? st.name : st.name + ", " 
            ))}
        </p>
        <div className={styles.ShortProfileWrapper}></div>
        <div className={styles.ShortProfileInfoWrapper}>
            <div className={styles.ShortProfilePriceTitle}>
                <p>Price:</p>
                <span>{` ${price}`}</span>
                <span>$/</span>
                <span>{duration}</span><span>min</span>
            </div>
            <div className={styles.ShortProfileThemesTitle}>
                <p>Work with themes:</p>
            </div>
            <div className={styles.ShortProfileThemes}>
                <ul className={styles.ShortProfileThemeList}>
                    {themes.map(t => (
                        <li>
                            <span>{t.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div className={styles.ShortProfilesButtonsWrapper}>
            <Button className={styles.ShortProfileAboutButton} onClick={forwardToProfile}>About</Button>
            <Button className={styles.ShortProfileAppoinmentButton} onClick={makeAppointment}>Make an appoinment</Button>
        </div>
    </div>   
    
}

export default PsyShortProfile;
