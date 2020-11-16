import React , { Component } from 'react';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Modal } from 'react-bootstrap';
import { Formik, Form} from 'formik';
import FormikControl from '../../Common/FormControl/FormikControl';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { setTokenData } from '../../../redux/auth-reducer';
import { authAPI } from '../../../api/authAPI';
import style from './Login.module.css'


const LoginForm = (props) => {
    const onSubmit = async (values, { setStatus, setFieldError }) => {
        const data = authAPI.loginUser(values.email, values.password)
                            .then(data => {
                                data = data.data
                                props.setTokenData(data.access, data.refresh, data.refresh_expired)
                                props.handlePostSubmit()
                            })
                            .catch(error => {
                                const errorCode = error.status.code
                                console.log(error)
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
                  </div>
              </div>
              <button type='submit' className='btn btn-primary'>Submit</button>
            </Form>
            )}
          </Formik>
        </div>
    )
}


const LoginContainer = (props) => {
    if(props.isAuth){
        return <Redirect to={"/"} />
    }
    const handleClose = () => {
        props.handleClose()
    }

    const handlePostSubmit = () => {
        if(props.modal){
            handleClose()
        }else{
            props.history.push('/');
        }
    }

    const setTokenData = (access, refresh, refExpired) => {
        props.setTokenData(access, refresh, refExpired)
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
                        setTokenData={setTokenData}
                        handlePostSubmit={handlePostSubmit} />
                    </Modal.Body>
                    <Modal.Footer>
                        Not registered yet? - 
                        <div> 
                            <NavLink to={'/registration'} onClick={handleClose}>Sign Up</NavLink> 
                        </div> 
                    </Modal.Footer>
                </Modal>
            </div>
            :
            <div className="container">
                <LoginForm
                setTokenData={setTokenData}
                handlePostSubmit={handlePostSubmit} />
            </div>
        }
        </>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, {setTokenData}),
    withRouter,
)(LoginContainer);

