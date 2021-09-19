import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import FormikControl from '../../Common/FormControl/FormikControl';
import * as Yup from 'yup';
import { profileAPI } from '../../../api/profileAPI';
import selectHelper from '../../../utils/selectHelper';


const ProfileForm = (props) => {
    const { profile, cities, countries, timezones, setUserProfile} = props
    const [currentCity, setCurrentCity] = useState(selectHelper.mapSelectOptions(profile.city))
    const [currentCountry, setCurrentCountry] = useState(selectHelper.mapSelectOptions(profile.city?.country))
    const [countryCities, setCountryCities] = useState(cities.filter(c => c.country.name === currentCountry.value))
    const cityOptions = selectHelper.mapSelectOptions(countryCities)
    const countryOptions = selectHelper.mapSelectOptions(countries)
    const timezoneOptions = selectHelper.mapSelectOptions(timezones)
    const [currentTimezone, setCurrentTimezone] = useState(selectHelper.mapSelectOptions(profile.timezone))


    const onSubmit = async (values, { setFieldError }) => {
      const password = values.password ? values.password : null
      const data = profileAPI.updatePsyUserProfile(profile.id,
                                                    values.email,
                                                    password,
                                                    values.name,
                                                    values.city.value,
                                                    values.country.value,
                                                    values.timezone.value)
                             .then(data => async () => {
                                await setUserProfile(data.data)
                             })
                             .catch(error => {
                                 if(error?.status?.code === 400){
                                     for (const [key, value] of Object.entries(error.data)) {
                                         setFieldError(key, value[0])    
                                    }
                                 }
                             })

    }


    const onCountryChange = (value, formik) => {
        const country = selectHelper.valueToSelectOptionObject(value)
        setCurrentCountry(country)
        setCountryCities(cities.filter(c => c.country.name === value))
        setCurrentCity('')
        formik.setFieldValue('country', country)
        formik.setFieldValue('city', null)
    }

    const onCityChange = (value, formik) => {
        const city = selectHelper.valueToSelectOptionObject(value)
        setCurrentCity(city)
        formik.setFieldValue('city', city)
    }

    const onTimezoneChange = (value, formik) => {
        const timezone = selectHelper.valueToSelectOptionObject(value)
        setCurrentTimezone(timezone)
        formik.setFieldValue('timezone', timezone)
    }

    let initialValues = {
        name: profile.name,
        email: profile.user.email,
        password: null,
        city: currentCity,
        country: currentCountry,
        timezone: currentTimezone
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        email: Yup.string().required('Required'),
    })


    return (
        <div>
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
                        errors={formik.errors}
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
                        value={currentCity}
                        options={cityOptions}
                        onChange={(value) => onCityChange(value, formik)}
                        required
                      />  
                      <FormikControl
                        className="form-control"
                        control='rselect'
                        name='country'
                        label='Country'
                        value={currentCountry}
                        options={countryOptions}
                        onChange={(value) => onCountryChange(value, formik)}
                      />  
                      <FormikControl
                        className="form-control"
                        control='rselect'
                        name='timezone'
                        label='Timezone'
                        value={currentTimezone}
                        options={timezoneOptions}
                        onChange={(value) => onTimezoneChange(value, formik)}
                      />  
                  </div>
              </div>
              <button type='submit' className='btn btn-primary'>Submit</button>
            </Form>
            )}
          </Formik>
        </div>
    )
}

const Profile = (props) => {
  const {profile, cities, countries, timezones, setUserProfile} = props
  return (
      <div className="container">
          <ProfileForm 
              profile={profile} 
              cities={cities}
              countries={countries}
              timezones={timezones}
              setUserProfile={setUserProfile} />
      </div>
      
  )
   
}

export default Profile;
