import React from 'react';
import Avatar from '../../Avatar/Avatar';
import Button from '../../Button/Button';
import styles from './PsyPublicProfile.module.scss';


const PsyPublicProfile = (props) => {
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
                    <Button className={styles.PsyPublicProfileAppoinmentButton}>
                        <span>Make an appoinment</span>
                    </Button>
                </div>
            </div>
            <div className={styles.PsyPublicProfileInfoAbout}>
                    {/* { profile.about } */}
                <p className={styles.PsyPublicProfileInfoAboutTitle}>About</p>
                <p className={styles.PsyPublicProfileInfoAboutText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempor ultrices diam a rhoncus. Maecenas facilisis diam tellus. Vestibulum in quam tincidunt, sodales orci fringilla, viverra dolor. Etiam ac tempor nisl, nec molestie orci. Nullam euismod ex nec purus tincidunt fermentum. Integer eu arcu non magna egestas bibendum. Ut nec rhoncus eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent elementum, augue a suscipit imperdiet, sapien dui blandit neque, ut mattis ipsum enim vel justo. Ut laoreet non sapien et varius. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed commodo ornare risus et accumsan. Phasellus venenatis dignissim lectus, at tincidunt ex cursus ut. Aliquam interdum, sapien sit amet facilisis efficitur, lacus lorem accumsan nunc, et rutrum elit orci a metus. Nunc sed purus vel mauris euismod dapibus. Maecenas sodales accumsan consectetur. Integer id erat felis. Quisque accumsan pellentesque venenatis. Mauris et lorem quis ipsum eleifend tincidunt. Maecenas elementum dapibus leo, id consequat velit dictum vel. Aliquam id ligula diam. Suspendisse potenti. Nulla cursus placerat dui, tincidunt bibendum ante lobortis ut. Sed ut felis quis mi bibendum ullamcorper. Donec commodo pretium nibh non bibendum. Morbi sed luctus ligula. Etiam placerat consectetur magna eget vulputate. Sed sollicitudin turpis rhoncus arcu ultricies pellentesque. Mauris ullamcorper lorem vitae placerat tristique.</p>
            </div>
        </div>
    )
   
}

export default PsyPublicProfile;
