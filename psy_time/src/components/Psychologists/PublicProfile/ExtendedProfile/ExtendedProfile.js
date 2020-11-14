import React from 'react'
import { compose } from 'redux'

const ExtendedProfile = (props) => {
    const profile = props.profile

    const renderPropsArrays = (array) => {
        let length = array.length
        return array.map((item, index) => (
            length - 1 == index ? item.name : item.name + ", " 
        ))
    }
    
    return (
        <>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Age</h5>
                <p className="card-text">
                    {profile.age}
                </p>            
            </div>
        </div>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Location</h5>
                <p className="card-text">
                    {profile.city.name + ", " + profile.city.country.name}
                </p>
            
            </div>
        </div>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Statuses</h5>
                <p className="card-text">
                    {renderPropsArrays(profile.statuses)}
                </p>
            
            </div>
        </div>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Fromats</h5>
                <p className="card-text">
                    {renderPropsArrays(profile.formats)}
                </p>
            
            </div>
        </div>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Works with themes</h5>
                <p className="card-text">
                    {renderPropsArrays(profile.themes)}
                </p>
            
            </div>
        </div>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Approaches</h5>
                <p className="card-text">
                    {renderPropsArrays(profile.approaches)}
                </p>
            </div>
        </div>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Specializations</h5>
                <p className="card-text">
                    {renderPropsArrays(profile.specializations)}
                </p>
            </div>
        </div>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Educations</h5>
                <p className="card-text">
                    {renderPropsArrays(profile.educations)}
                </p>
            
            </div>
        </div>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Secondary educations</h5>
                <p className="card-text">
                    {renderPropsArrays(profile.secondary_educations)}
                </p>
            
            </div>
        </div>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Languages</h5>
                <p className="card-text">
                    {renderPropsArrays(profile.languages)}
                </p>
            
            </div>
        </div>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Work experience</h5>
                <p className="card-text">
                    {profile.work_experience}
                </p>
            
            </div>
        </div>
        </>
    )
    
}

export default ExtendedProfile
