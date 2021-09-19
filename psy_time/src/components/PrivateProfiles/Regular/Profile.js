import React, { useState } from 'react';
import { Formik, Form} from 'formik';
import FormikControl from '../../Common/FormControl/FormikControl';
import * as Yup from 'yup';
import { profileAPI } from '../../../api/profileAPI';
import selectHelper from '../../../utils/selectHelper';


const ProfileForm = (props) => {
    const { profile, timezones, setUserProfile } = props
    const timezoneOptions = selectHelper.mapSelectOptions(timezones)
    const [currentTimezone, setCurrentTimezone] = useState(selectHelper.mapSelectOptions(profile.timezone))


    const onSubmit = async (values, { setFieldError }) => {
        const password = values.password ? values.password : null
        const data = profileAPI.updateRegularUserProfile(profile.id,
                                                         values.email,
                                                         password,
                                                         values.name,
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

    const onTimezoneChange = (value, formik) => {
      const timezone = selectHelper.valueToSelectOptionObject(value)
      setCurrentTimezone(timezone)
      formik.setFieldValue('timezone', timezone)
  }

    let initialValues = {
        name: profile.name,
        email: profile.user.email,
        password: null,
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
  return (
      <div className="container">
          <ProfileForm
              profile={props.profile}
              timezones={props.timezones}
              setUserProfile={props.setUserProfile} />
      </div>
      
  )
   
}

export default Profile;
