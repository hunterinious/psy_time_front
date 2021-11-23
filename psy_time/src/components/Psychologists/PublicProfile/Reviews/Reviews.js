import React from 'react';
import Card from '../../../Common/Card/Card';
import SubmitButton from '../../../Common/Buttons/SubmitButton/SubmitButton';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormikControl from '../../../Common/FormControl/FormikControl';
import styles from './Reviews.module.scss'


const ReviewForm = (props) => {
    const {createReview} = props

    const onSubmit = async (values, actions) => {
        const onFail = (error) => {
            if(error.status === 400){
                for (const [key, value] of Object.entries(error.data)) {
                    actions.setFieldError(key, value[0])    
                }
            }
        }

        const {text} = values
        createReview({text}, null, onFail)
    }

    const initialValues = {
        text: '',
    }

    const validationSchema = Yup.object().shape({
        text: Yup.string().required('Required'),
    })

   
    return (
        <div className={styles.ReviewForm}>
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
                    <FormikControl
                        errors={formik.errors}
                        className="form-control"
                        control='textarea'
                        type='text'
                        name='text'
                        label='Review text'
                        wrapperClassName={styles.ReviewFormTextArea}
                    />
                </div>
                <SubmitButton className={styles.ReviewFormSubmitButton} type='submit'>Add review</SubmitButton>
            </Form>
            )}
          </Formik>
        </div>
    )
}


const Reviews = (props) => {
    const {userId, reviews, createReview} = props
    return (
        <div className={styles.Reviews}>
            { userId && <ReviewForm createReview={createReview}/> }
            {
                reviews.map((r, i) => (
                    <Card title={r.name} text={r.text} key={`${userId}-${i}`}/>
                ))
            }
        </div>
    )
  
}


export default Reviews;
