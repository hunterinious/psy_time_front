import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import FormikControl from '../../Common/FormControl/FormikControl';
import * as Yup from 'yup';
import commonProfileStyles from '../Profiles.module.scss';
import SubmitButton from '../../Common/Buttons/SubmitButton/SubmitButton';


const ProfileForm = (props) => {
    const {user, cities, countries, timezones, updateProfile} = props
    const profile = user.profile
    const [currentCityName, setCurrentCityName] = useState(profile.city.name)
    const [currentCountryName, setCurrentCountryName] = useState(profile.city?.country?.name)
    const [countryCities, setCountryCities] = useState(cities.filter(c => c.country.name === currentCountryName))
    const timezone = profile.timezone
    const timezoneName = timezone.name
    const [isProfileUpdateSuccess, setIsProfileUpdateSuccess] = useState(false)


    const onSubmit = async (values, actions) => {
        const onFail = (error) => {
            if(error.status.code === 400){
                for (const [key, value] of Object.entries(error.data)) {
                    actions.setFieldError(key, value[0])    
                }
            }
        }

        const onSuccess = () => {
            setIsProfileUpdateSuccess(true)
        }

        const {email, password, name, city, country, timezone} = values
        updateProfile({id: user.id, email, password, name, city,
                                     country, timezone}, onSuccess, onFail)
    }

    const onCountryChange = (option, formik) => {
        const countryName = option.value
        setCurrentCountryName(countryName)
        setCountryCities(cities.filter(c => c.country.name === countryName))
        setCurrentCityName(null)
        formik.setFieldValue('city', null)
    }

    let initialValues = {
        name: profile.name,
        email: user.email,
        password: undefined,
        city: currentCityName,
        country: currentCountryName,
        timezone: timezoneName
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        email: Yup.string().required('Required'),
    })


    return (
        <div>
            {isProfileUpdateSuccess ? (
                <div className="alert alert-success" role="alert">
                    Profile has been successfully updated
                </div>
            ) : null}
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}      
            >
            {formik => (
            <Form>
                <div className="row">
                    <div className="col">
                        <FormikControl
                            className="form-control"
                            control='input'
                            type='text'
                            name='name'
                            label='Name'
                        />
                        <FormikControl
                            className="form-control"
                            control='input'
                            type='email'
                            name='email'
                            label='Email'
                        />
                        <FormikControl
                            className="form-control"
                            control='input'
                            type='password'
                            name='password'
                            label='Password'
                        />
                        <FormikControl
                            className="form-control"
                            control='rselect'
                            name='city'
                            label='City'
                            placeholder='Select...'
                            value={currentCityName}
                            options={countryCities}
                            required
                        />  
                        <FormikControl
                            className="form-control"
                            control='rselect'
                            name='country'
                            label='Country'
                            value={currentCountryName}
                            options={countries}
                            onChange={(option) => onCountryChange(option, formik)}
                        />  
                        <FormikControl
                            className="form-control"
                            control='rselect'
                            name='timezone'
                            label='Timezone'
                            value={timezone}
                            options={timezones}
                            isTimezone
                        />  
                    </div>
              </div>
              <div className={commonProfileStyles.ProfilePageSubmitButtonContainer}>
                <SubmitButton type='submit'>Submit</SubmitButton>
              </div>
            </Form>
            )}
          </Formik>
        </div>
    )
}

const Profile = (props) => {
  const {user, cities, countries, timezones, updateProfile} = props

  return (
      <div className={commonProfileStyles.ProfilePage}>
          <ProfileForm 
              user={user}
              cities={cities}
              countries={countries}
              timezones={timezones}
              updateProfile={updateProfile} />
      </div>
      
  )
   
}

export default Profile;
