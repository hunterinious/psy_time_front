import React from 'react';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormikControl from '../Common/FormControl/FormikControl';
import { helpAPI } from '../../api/helpApi';


const Help = (props) => {
    props.countries.unshift("Choose a country")

    const themeOptions = ["Help to choose", "Your question"]

    const onSubmit = async values => {
 
        let theme = ''
        let selectTheme = values.selectTheme
        if (selectTheme === themeOptions[0]){
            theme = selectTheme
        }else {
            theme = values.yourTheme
        }
     
        let data = await helpAPI.help(values.email, values.username, values.countries,
                                theme, values.message)
       
        if(data.status.code === 201) {
            alert("Your request in pending")
            props.handleClose()
        }
    }

    const initialValues = {
        email: '',
        username: '',
        message: '',
        countries: '',
        selectTheme: props.helpToChoose ? themeOptions[0] : themeOptions[1],
        yourTheme: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
        username: Yup.string().required('Required'),
        message: Yup.string().required('Required'),
        countries: Yup.string().required('Required'),
        selectTheme: Yup.string().notRequired(''),
        yourTheme: Yup.string().when('selectTheme', {
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
                          name='yourTheme'
                        />
                      : null
                      }
                  </div>
                  <div className="col">
                      <FormikControl
                        className="form-control"
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

 
