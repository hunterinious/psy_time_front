import React from 'react';
import styles from '../../Psychologists.module.css';

const RandomPsy = (props) => {
    let profile = props.random_profile
    
    const handleGetRandom = () => {
        props.getRandomPsyUserProfile()
    }

    return (
        <div>
            <div>
                <img src={profile.avatar} className={styles.userPhoto}/>    
            </div>
            <div>
                {profile.username}
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
