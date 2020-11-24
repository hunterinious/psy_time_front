import React , { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Form} from 'formik';
import FormikControl from '../../Common/FormControl/FormikControl';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { getUserLoginData } from '../../../redux/auth-reducer';
import { authAPI } from '../../../api/authAPI';


const RegistrationForm = (props) => {
    const onSubmit = async (values, { setSubmitting, setFieldError }) => {
        const data = authAPI.registerUser(values.email, values.password, values.name)
                            .then(data => {
                                data = data.data
                                localStorage.setItem('access_token', data.access)
                                localStorage.setItem('refresh_token', data.refresh)
                                localStorage.setItem('refresh_expire', data.refresh_expire)
                            })
                            .catch(error => {
                                if(error.status.code === 400){
                                    for (const [key, value] of Object.entries(error.data)) {
                                        setFieldError(key, value[0])    
                                    };
                                }
                            })

    }

    const initialValues = {
        email: '',
        password: '',
        name: ''
        
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
        name: Yup.string().required('Required'),
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
                        control='input'
                        type='text'
                        name='name'
                        label='Name'
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


const Registration = (props) => {
    if(props.isAuth){
        return <Redirect to='/profile' />
    }
    
    return(
        <div className="container">
            <RegistrationForm/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {getUserLoginData})(Registration);
