import React, { useState } from 'react';
import { Formik, Form} from 'formik';
import FormikControl from '../../Common/FormControl/FormikControl';
import * as Yup from 'yup';
import selectHelper from '../../../utils/selectHelper';


const ProfileForm = (props) => {
    const { user, timezones, updatePrivateRegularUserProfile } = props
    const profile = user.profile
    const timezoneOptions = selectHelper.mapSelectOptions(timezones)
    const [currentTimezone, setCurrentTimezone] = useState(selectHelper.mapSelectOptions(profile.timezone))

    const onSubmit = async (values, actions) => {
        const onSubmitRequestFailed = (error) => {
          for (const [key, value] of Object.entries(error.data)) {
            actions.setFieldError(key, value[0])    
          }
        }

        const {email, password, name, timezone} = values
        updatePrivateRegularUserProfile({id: user.id, email, password, name, timezone: timezone.value, onFail: onSubmitRequestFailed})
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
  const {user, timezones, updatePrivateRegularUserProfile} = props

  return (
      <div className="container">
          <ProfileForm
              user={user}
              timezones={timezones}
              updatePrivateRegularUserProfile={updatePrivateRegularUserProfile} />
      </div>
      
  )
   
}

export default Profile;
