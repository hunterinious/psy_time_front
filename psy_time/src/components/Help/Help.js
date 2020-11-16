import React from 'react';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormikControl from '../Common/FormControl/FormikControl';
import { helpAPI } from '../../api/helpAPI';
import style from './Help.module.css'


const Help = (props) => {
    props.countries.unshift("Choose a country")

    const themeOptions = ["Help to choose", "Your question"]

    const onSubmit = async (values, { setSubmitting, setFieldError }) => {
        const selectTheme = values.selectTheme
        const theme = selectTheme === themeOptions[0] ? selectTheme : values.theme

        const data = helpAPI.help(values.email, values.username, values.countries,
                                  theme, values.message)
                            .then(() => {
                                alert("Your request in pending")
                                props.handleClose()
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
        username: '',
        message: '',
        countries: '',
        selectTheme: props.helpToChoose ? themeOptions[0] : themeOptions[1],
        theme: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
        username: Yup.string().required('Required'),
        message: Yup.string().required('Required'),
        countries: Yup.string().required('Required'),
        selectTheme: Yup.string().notRequired(''),
        theme: Yup.string().when('selectTheme', {
            is: themeOptions[1],
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
                        type='text'
                        placeholder='Your name'
                        name='username'
                      />
                      <FormikControl
                        className="form-control"
                        control='select'
                        name='countries'
                        options={props.countries}
                      />
                      <FormikControl
                        className="form-control"
                        control='select'
                        name='selectTheme'
                        options={themeOptions}
                      />
                      {formik.values.selectTheme === themeOptions[1] 
                      ? <FormikControl
                          className="form-control"
                          control='input'
                          type='text'
                          placeholder='Theme'
                          name='theme'
                        />
                      : null
                      }
                  </div>
                  <div className="col">
                      <FormikControl
                        className={"form-control " + style.message}
                        control='textarea'
                        placeholder='Message Text'
                        name='message'
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



export default Help;

 
