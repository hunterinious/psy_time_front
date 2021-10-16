import React, { useState } from 'react';
import { Formik, Form} from 'formik';
import FormikControl from '../../Common/FormControl/FormikControl';
import * as Yup from 'yup';


const ProfileForm = (props) => {
    const { user, timezones, updateProfile} = props
    const profile = user.profile
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

        const {email, password, name, timezone} = values
        updateProfile({id: user.id, email, password, name, timezone}, onSuccess, onFail)
    }

    let initialValues = {
        name: profile.name,
        email: user.email,
        password: undefined,
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
							name='timezone'
							label='Timezone'
							value={timezone}
							options={timezones}
							isTimezone
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
  const {user, timezones, updateProfile} = props

  return (
      <div className="container">
          <ProfileForm
              user={user}
              timezones={timezones}
              updateProfile={updateProfile} />
      </div>
      
  )
}

export default Profile;
