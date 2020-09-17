import React, { Component } from 'react';
import styles from './Psychologists.module.css';
import PsyShortProfile from './PsyShortProfile'


const PsyProfiles = (props) => {

   return <div className={"d-flex p-2 flex-wrap "}>
        {  
            props.profiles.map(p => <PsyShortProfile 
                avatar={p.avatar}
                statuses={p.statuses}
                user={p.user}
                key={p.id} />)
             
        }
        </div>   
    
}

export default PsyProfiles;
