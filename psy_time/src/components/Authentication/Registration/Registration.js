import React , { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form} from 'formik';
import FormikControl from '../../Common/FormControl/FormikControl';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { setTokenData } from '../../../redux/auth-reducer';
import { authAPI } from '../../../api/authAPI';


const RegistrationForm = (props) => {
    const onSubmit = async (values, { setSubmitting, setFieldError }) => {
        const data = authAPI.registerUser(values.email, values.password, values.name)
                            .then(data => {
                                data = data.data
                                props.setTokenData(data.access, data.refresh, data.refresh_expired)
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
                        placeholder='Email'
                        name='email'
                      />
                      <FormikControl
                        className="form-control"
                        control='input'
                        type='password'
                        placeholder='Password'
                        name='password'
                      />
                      <FormikControl
                        className="form-control"
                        control='input'
                        type='text'
                        placeholder='Your name'
                        name='name'
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
    return(
        <div className="container">
            <RegistrationForm
            setTokenData={props.setTokenData} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {setTokenData})(Registration);
