import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Modal } from 'react-bootstrap';
import { Formik, Form} from 'formik';
import FormikControl from '../../Common/FormControl/FormikControl';
import * as routePaths from '../../../consts/route/routePaths';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import styles from './Login.module.scss'
import { loginUser } from '../../../redux/auth-reducer';
import appRouterService from '../../../services/appRouterService';


const LoginForm = (props) => {
    const onSubmit = async (values, actions) => {
        const onFail = (error) => {
            const errorStatus = error.status

            if(errorStatus === 400){
                for (const [key, value] of Object.entries(error.data)) {
                    actions.setFieldError(key, value[0])    
                };
            }
            if(errorStatus === 401){
                actions.setStatus(error.data.detail)
            }
        }

        const onSuccess = (res) => {
            props.handlePostSubmit()
        }

        const {email, password} = values
        loginUser({email, password}, onSuccess, onFail)
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
                <div className={styles.invalidFeedback}>
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
                <button type='submit' className='btn btn-primary mb-3'>Submit</button>
            </Form>
            )}
          </Formik>
        </div>
    )
}

const SingUpBlock = (props) => {
    return (
        <div> 
            Not registered yet? - <Link to={routePaths.REGISTRATION} onClick={props.handleClose}>Sign Up</Link> 
        </div> 
    )
}


const LoginContainer = (props) => {
    const redirectToProfile = () => {
        appRouterService.forwardToPrivateProfilePage()
    }
    
    const handleClose = () => {
        props.handleClose()
    }

    const handlePostSubmit = () => {
        if(props.modal){
            handleClose()
            redirectToProfile()
        }else{
            redirectToProfile()
        }
    }

    if(props.isAuth){
        redirectToProfile()
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
                        <LoginForm handlePostSubmit={handlePostSubmit} />
                    </Modal.Body>
                    <Modal.Footer>
                        <SingUpBlock handleClose={handleClose}/>
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
    connect(mapStateToProps, {loginUser}),
    withRouter,
)(LoginContainer);

