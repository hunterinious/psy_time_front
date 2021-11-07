import React from 'react';
import styles from '../Psychologists.module.scss';
import localClassNames from './PsyPublicProfile.module.scss'


const PsyPublicProfile = (props) => {
    const profile = props.profile

    return (
        <div className="container">
            <div className="row flex-row">
                <div className="col-lg-offset-1 col-lg-4">
                    <img src={profile.avatar} className={styles.userPhoto} alt='therapist avatar'/>
                </div>
                <div className="col-lg-offset-1 col-lg-6">
                    <div className="row">
                        <div className="col">
                            {profile.name}
                        </div>
                        <div className="col-2">
                            {`$${profile.duration}/${profile.price}min`}
                        </div>
                    </div>
                    <div className={"row " + localClassNames.about} >
                        { profile.about }
                    </div>
                </div>
            </div>
        </div>
    )
   
}

export default PsyPublicProfile;
