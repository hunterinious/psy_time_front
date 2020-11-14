import React, { Component } from 'react';
import styles from './Psychologists.module.css';
import PsyShortProfile from './PsyShortProfile'


const PsyProfiles = (props) => {

   return <div className={"d-flex p-2 flex-wrap "}>
        {  
            props.profiles.map(p => <PsyShortProfile 
                id={p.id}
                avatar={p.avatar}
                statuses={p.statuses}
                name={p.name}
                key={p.id} />)
             
        }
        </div>   
    
}

export default PsyProfiles;
