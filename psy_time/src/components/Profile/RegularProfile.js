import React from 'react';
import { Formik, Form} from 'formik';
import FormikControl from '../Common/FormControl/FormikControl';
import * as Yup from 'yup';
import { profileAPI } from '../../api/profileAPI';


const RegularProfileForm = (props) => {
    const profile = props.profile
    const countries = props.countries
    const cities = props.cities


    const onSubmit = async (values, { setSubmitting, setFieldError }) => {
        const data = profileAPI.updateRegularUserProfile(profile.id,
                                                         values.email,
                                                         values.password,
                                                         values.name,
                                                         values.country)
                               .then(data => {
                                 data = data.data
                               })
                               .catch(error => {
                                   if(error.status.code === 400){
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
                        label='New Password'
                      />
                    <FormikControl
                        control='rselect'
                        name='country'
                        label='Country'
                        value={profile.city ? profile.city.country.name : countries[0].value}
                        options={countries}
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

const RegularProfile = (props) => {
    return (
        <div className="container">
            <RegularProfileForm profile={props.profile} countries={props.countries} />
        </div>
        
    )
   
}

export default RegularProfile;
