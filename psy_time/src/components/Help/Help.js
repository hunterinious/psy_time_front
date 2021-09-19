import React, { useState } from 'react';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormikControl from '../Common/FormControl/FormikControl';
import { helpAPI } from '../../api/helpAPI';
import style from './Help.module.css'
import selectHelper from '../../utils/selectHelper';


const Help = (props) => {
    const {countries, handleClose} = props
    const [helpToChoose, setHelpToChoose] = useState(props.helpToChoose)
    const themeOptions = [
        { value: "Help to choose", label: "Help to choose"},
        { value: "Your question", label: "Your question" }
    ]
    const countryOptions = selectHelper.mapSelectOptions(countries)

    const onSubmit = async (values, { setSubmitting, setFieldError }) => {
        const selectTheme = values.selectTheme
        const theme = selectTheme === themeOptions[0].value ? selectTheme : values.theme

        const data = helpAPI.help(values.email, values.name, values.country,
                                  theme, values.message)
                            .then(() => {
                                alert("Your request in pending")
                                handleClose()
                            })
                            .catch(error => {
                                if(error.status.code === 400){
                                    for (const [key, value] of Object.entries(error.data)) {
                                        setFieldError(key, value[0])    
                                    };
                                }
                            })

    }

    const handleThemeChange = (value) => {
        if(value === themeOptions[1].value){
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
        selectTheme: helpToChoose ? themeOptions[0].value : themeOptions[1].value
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
        name: Yup.string().required('Required'),
        message: Yup.string().required('Required'),
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
                        type='text'
                        name='name'
                        label='Name'
                      />
                      <FormikControl
                        control='rselect'
                        name='country'
                        options={countryOptions}
                        label='Choose a country'
                      />
                      <FormikControl
                        control='rselect'
                        name='selectTheme'
                        options={themeOptions}
                        label='Choose your theme'
                        value={helpToChoose ? themeOptions[0]: themeOptions[1]}
                        onChange={handleThemeChange}
                      />
                      {formik.values.selectTheme === themeOptions[1].value
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
                        className={"form-control " + style.message}
                        control='textarea'
                        name='message'
                        label='Text message'
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

 
