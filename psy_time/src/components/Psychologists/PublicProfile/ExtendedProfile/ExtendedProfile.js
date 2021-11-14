import React from 'react';
import Card from '../../../Common/Card/Card';

const ExtendedProfile = (props) => {
    const profile = props.profile

    const renderPropsArrays = (array) => {
        let length = array.length
        return array.map((item, index) => (
            length - 1 === index ? item.name : item.name + ", " 
        ))
    }
    
    return (
        <>
            <Card title={'Age'} text={profile.age} />
            <Card title={'Location'} text={profile.city.name + ", " + profile.city.country.name} />
            <Card title={'Statuses'} text={renderPropsArrays(profile.statuses)} />
            <Card title={'Formats'} text={renderPropsArrays(profile.formats)} />
            <Card title={'Work with themes'} text={renderPropsArrays(profile.themes)} />
            <Card title={'Approcahes'} text={renderPropsArrays(profile.approaches)} />
            <Card title={'Specializations'} text={renderPropsArrays(profile.specializations)} />
            <Card title={'Educations'} text={renderPropsArrays(profile.educations)} />
            <Card title={'Secondary educations'} text={renderPropsArrays(profile.secondary_educations)} />
            <Card title={'Languages'} text={renderPropsArrays(profile.languages)} />
            <Card title={'Work experience'} text={profile.work_experience} />
        </>
    )
    
}

export default ExtendedProfile;
