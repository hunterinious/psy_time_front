import React, { useState } from 'react';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormikControl from '../Common/FormControl/FormikControl';
import helpService from '../../services/helpService';
import SubmitButton from '../Common/Buttons/SubmitButton/SubmitButton';
import styles from './Help.module.scss'


const Help = (props) => {
    const {countries, handleClose} = props
    const [helpToChoose, setHelpToChoose] = useState(props.helpToChoose)
    const themeOptions = ["Help to choose", "Your question"]

    const onSubmit = async (values, actions) => {
        const onFail = (error) => {
            if(error.status === 400){
                for (const [key, value] of Object.entries(error.data)) {
                    actions.setFieldError(key, value[0])    
                }
            }
        }

        const onSuccess = (res) => {
            alert("Your request in pending")
            handleClose()
        }

        const {email, name, country, selectTheme, theme, message} = values
        const themeValue = selectTheme === themeOptions[0] ? selectTheme : theme

        helpService.callHelpRequest({email, name, country, theme: themeValue, message}, onSuccess, onFail)
    }

    const handleThemeChange = (option) => {
        if(option.value === themeOptions[1]){
            setHelpToChoose(false)
        }else {
            setHelpToChoose(true)
        }
    }

    const initialValues = {
        email: '',
        name: '',
        message: '',
        theme: '',
        selectTheme: helpToChoose ? themeOptions[0] : themeOptions[1]
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
        name: Yup.string()
                .required('Required')
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
        message: Yup.string().notRequired(),
        country: Yup.string().required('Required'),
        theme: Yup.string().when('selectTheme', {
            is: themeOptions[1].value,
            then: Yup.string().required("Required")
        })
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
                {<div>{formik.errors[0]}</div>}
                <div className="row">
                    <div className="col">
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
                            type='text'
                            name='name'
                            label='Name'
                        />
                        <FormikControl
                            control='rselect'
                            name='country'
                            options={countries}
                            label='Choose a country'
                            required
                        />
                        <FormikControl
                            control='rselect'
                            name='selectTheme'
                            options={themeOptions}
                            label='Choose your theme'
                            value={helpToChoose ? themeOptions[0]: themeOptions[1]}
                            onChange={handleThemeChange}
                        />
                        {!helpToChoose
                        ? <FormikControl
                            className="form-control"
                            control='input'
                            type='text'
                            name='theme'
                            label='Your theme'
                            />
                        : null
                        }
                    </div>
                    <div className="col">
                        <FormikControl
                            className={"form-control " + styles.Message}
                            control='textarea'
                            name='message'
                            label='Text message'
                        />
                    </div>
                </div>
                <SubmitButton type='submit' className={styles.SubmitButton}>Submit</SubmitButton>
            </Form>
            )}
          </Formik>
        </div>
    )
}

export default Help;
