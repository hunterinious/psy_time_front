import React from 'react';

const PsychologistProfile = (props) => {
    const profile = props.profile
    return (
        <div>
            {profile.email}
        </div>
    )
   
}

export default PsychologistProfile;
