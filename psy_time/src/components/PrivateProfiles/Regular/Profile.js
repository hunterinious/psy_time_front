import React from 'react';
import { Formik, Form} from 'formik';
import FormikControl from '../../Common/FormControl/FormikControl';
import * as Yup from 'yup';
import { profileAPI } from '../../../api/profileAPI';


const ProfileForm = (props) => {
    const profile = props.profile
    const profileTimezone = profile.timezone
    const timezones = props.timezones
    const currentTimezone = { value: profileTimezone.name, label:  profileTimezone.name}


    const onSubmit = async (values, { setSubmitting, setFieldError }) => {
        const data = profileAPI.updateRegularUserProfile(profile.id,
                                                         values.email,
                                                         values.password,
                                                         values.name,
                                                         values.timezone)
                               .then(data => async () => {
                                  await props.setUserProfile(data.data)
                               })
                               .catch(error => {
                                   if(error?.status?.code === 400){
                                       for (const [key, value] of Object.entries(error.data)) {
                                           setFieldError(key, value[0])    
                                      }
                                   }
                               })

    }

    const initialValues = {
        name: profile.name,
        email: profile.user.email,
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
                        options={timezones}
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
          <ProfileForm profile={props.profile}
              timezones={props.timezones}
              setUserProfile={props.setUserProfile} />
      </div>
      
  )
   
}

export default Profile;
