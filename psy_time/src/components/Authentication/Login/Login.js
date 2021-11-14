import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Modal } from 'react-bootstrap';
import { Formik, Form} from 'formik';
import SubmitButton from '../../Common/Buttons/SubmitButton/SubmitButton';
import Button from '../../Common/Buttons/Button/Button';
import FormikControl from '../../Common/FormControl/FormikControl';
import * as routePaths from '../../../consts/route/routePaths';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { loginUser } from '../../../redux/auth-reducer';
import appRouterService from '../../../services/appRouterService';
import styles from './Login.module.scss'


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
        <div className={styles.LoginForm}>
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            >
            {formik => (
            <Form>
                <div className={styles.InvalidFeedback}>
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
                <SubmitButton className={styles.LoginFormSubmitButton} type='submit'>Submit</SubmitButton>
            </Form>
            )}
          </Formik>
        </div>
    )
}

const SingUpBlock = (props) => {
    return (
        <div className={styles.SingUpBlock}> 
            <p>Not registered yet? - </p>
            <a href ={routePaths.REGISTRATION} onClick={props.handleClose}>
                <Button className={styles.SingUpBlockButton}>Sign Up</Button>
            </a> 
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
           
            :
            <div className={styles.LoginPage}>
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

