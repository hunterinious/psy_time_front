import React from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Form} from 'formik';
import FormikControl from '../../Common/FormControl/FormikControl';
import * as Yup from 'yup';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { registerUser } from '../../../redux/auth-reducer';
import appRouterService from '../../../services/appRouterService';


const RegistrationForm = (props) => {
    const onSubmit = async (values, actions) => {
        const onFail = (error) => {
            if(error.status === 400){
                for (const [key, value] of Object.entries(error.data)) {
                    actions.setFieldError(key, value[0])    
                }
            }
        }

        const onSuccess = (res) => {
            props.handlePostSubmit()
        }

        const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone
        const {email, password, name} = values
        registerUser({email, password, name, timezoneName}, onSuccess, onFail)
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
    const redirectToProfile = () => {
        appRouterService.forwardToPrivateProfilePage()
    }

    const handlePostSubmit = () => {
        redirectToProfile()
    }

    if(props.isAuth){
        redirectToProfile()
    }
    
    return(
        <div className="container">
            <RegistrationForm handlePostSubmit={handlePostSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, {}),
    withRouter
)(Registration);
