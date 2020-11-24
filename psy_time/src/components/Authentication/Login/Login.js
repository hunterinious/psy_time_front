import React , { Component } from 'react';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Modal } from 'react-bootstrap';
import { Formik, Form} from 'formik';
import FormikControl from '../../Common/FormControl/FormikControl';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { getUserLoginData } from '../../../redux/auth-reducer';
import { authAPI } from '../../../api/authAPI';
import style from './Login.module.css'


const LoginForm = (props) => {
    const onSubmit = async (values, { setStatus, setFieldError }) => {
        const data = authAPI.loginUser(values.email, values.password)
                            .then(data => {
                                data = data.data
                                localStorage.setItem('access_token', data.access)
                                localStorage.setItem('refresh_token', data.refresh)
                                localStorage.setItem('refresh_expire', data.refresh_expire)
                                props.handlePostSubmit()
                            })
                            .catch(error => {
                                const errorCode = error.status.code

                                if(errorCode === 400){
                                    for (const [key, value] of Object.entries(error.data)) {
                                        setFieldError(key, value[0])    
                                    };
                                }
                                if(errorCode === 401){
                                    setStatus(error.data.detail)
                                }
                            })

    }

    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
        password: Yup.string().required('Required')
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
              <div className={style.invalidFeedback}>
                {formik.status}
              </div>
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
                  </div>
              </div>
              <button type='submit' className='btn btn-primary'>Submit</button>
            </Form>
            )}
          </Formik>
        </div>
    )
}

const SingUpBlock = (props) => {
    return (
        <div> 
        Not registered yet? - <NavLink to={'/registration'}>Sign Up</NavLink> 
        </div> 
    )
}


const LoginContainer = (props) => {
    if(props.isAuth){
        props.history.push('/profile')
    }
    
    const handleClose = () => {
        props.handleClose()
    }

    const handlePostSubmit = () => {
        if(props.modal){
            handleClose()
        }else{
            props.history.push('/profile')
        }
    }


    return(
        <>
        {props.modal
            ?
            <div>
                <Modal size="lg" show={true} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                            <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LoginForm
                        handlePostSubmit={handlePostSubmit} />
                    </Modal.Body>
                    <Modal.Footer>
                        <SingUpBlock />
                    </Modal.Footer>
                </Modal>
            </div>
            :
            <div className="container">
                <LoginForm
                handlePostSubmit={handlePostSubmit}
                />
                <SingUpBlock />
            </div>
        }
        </>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, {getUserLoginData}),
    withRouter,
)(LoginContainer);

