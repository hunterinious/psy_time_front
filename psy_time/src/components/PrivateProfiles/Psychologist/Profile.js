import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import FormikControl from '../../Common/FormControl/FormikControl';
import * as Yup from 'yup';
import selectHelper from '../../../utils/selectHelper';


const ProfileForm = (props) => {
    const {user, cities, countries, timezones, updatePrivatePsyUserProfile} = props
    const profile = user.profile
    const [currentCity, setCurrentCity] = useState(selectHelper.mapSelectOptions(profile.city))
    const [currentCountry, setCurrentCountry] = useState(selectHelper.mapSelectOptions(profile.city?.country))
    const [countryCities, setCountryCities] = useState(cities.filter(c => c.country.name === currentCountry.value))
    const cityOptions = selectHelper.mapSelectOptions(countryCities)
    const countryOptions = selectHelper.mapSelectOptions(countries)
    const timezoneOptions = selectHelper.mapSelectOptions(timezones)
    const [currentTimezone, setCurrentTimezone] = useState(selectHelper.mapSelectOptions(profile.timezone))


    const onSubmit = async (values, actions) => {
        const onSubmitRequestFailed = (error) => {
          for (const [key, value] of Object.entries(error.data)) {
            actions.setFieldError(key, value[0])    
          }
        }

        const {email, password, name, city, country, timezone} = values
        updatePrivatePsyUserProfile({id: user.id, email, password, name, city: city.value,
                                     country: country.value, timezone:timezone.value, onFail: onSubmitRequestFailed})
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
        email: user.email,
        password: undefined,
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
  const {user, cities, countries, timezones, updatePrivatePsyUserProfile} = props

  return (
      <div className="container">
          <ProfileForm 
              user={user}
              cities={cities}
              countries={countries}
              timezones={timezones}
              updatePrivatePsyUserProfile={updatePrivatePsyUserProfile} />
      </div>
      
  )
   
}

export default Profile;
