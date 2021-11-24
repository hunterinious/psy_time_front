import React, { useState } from 'react';
import cn from 'classnames';
import Card from '../../../Common/Card/Card';
import SubmitButton from '../../../Common/Buttons/SubmitButton/SubmitButton';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormikControl from '../../../Common/FormControl/FormikControl';
import editIcon from '../../../../assets/images/edit-icon.svg'
import deleteIcon from '../../../../assets/images/delete-icon.png'
import styles from './Reviews.module.scss'


const CreateReviewForm = (props) => {
    const {createReview} = props

    const onSubmit = async (values, actions) => {
        const onFail = (error) => {
            if(error.status === 400){
                for (const [key, value] of Object.entries(error.data)) {
                    actions.setFieldError(key, value[0])    
                }
            }
        }

        const onSuccess = () => {
            actions.resetForm({})
        }

        const {text} = values
        createReview({text: text.trim()}, onSuccess, onFail)
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
                <FormikControl
                    errors={formik.errors}
                    className="form-control"
                    control='textarea'
                    type='text'
                    name='text'
                    label='Review text'
                    wrapperClassName={styles.ReviewFormTextArea}
                />
                <SubmitButton className={styles.ReviewFormSubmitButton} type='submit'>Add review</SubmitButton>
            </Form>
            )}
          </Formik>
        </div>
    )
}

const UpdateReviewForm = (props) => {
    const {text, onReviewUpdate} = props

    const onSubmit = async (values, actions) => {
        const onFail = (error) => {
            if(error.status === 400){
                for (const [key, value] of Object.entries(error.data)) {
                    actions.setFieldError(key, value[0])    
                }
            }
        }

        const {text} = values
        onReviewUpdate({text: text.trim()}, null, onFail)
    }


    const initialValues = {
        text: text,
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
                <FormikControl
                    errors={formik.errors}
                    className="form-control"
                    control='textarea'
                    type='text'
                    name='text'
                    wrapperClassName={styles.ReviewFormTextAreaUpdate}
                />
                <SubmitButton className={styles.ReviewFormSubmitButtonUpdate} type='submit'>Update review</SubmitButton>
            </Form>
            )}
          </Formik>
        </div>
    )
}


const Reviews = (props) => {
    const {userId, reviews, createReview, deleteReview, updateReview} = props
    const [commentIdForUpdate, setCommentIdForUpdate] = useState(null)

    const onReviewDelete = (id) => {
        deleteReview({id})
    }

    const onReviewUpdateClick = (id) => {
        if(id === commentIdForUpdate){
            setCommentIdForUpdate(null)
        }else{
            setCommentIdForUpdate(id)
        }
    }

    const onReviewUpdate = (data, onSuccess, onFail) => {
        const {text} = data

        const onSuccessExtra = () => {
            if(onSuccess) onSuccess()
            setCommentIdForUpdate(null)
        }

        updateReview({id: commentIdForUpdate, text}, onSuccessExtra, onFail)
    }


    return (
        <div className={styles.Reviews}>
            {
                reviews.map((r, i) => {
                    const id = r.id
                    const cardClassName = r.editable ? styles.ReviewCard : cn(styles.ReviewCard, styles.ReviewCardNonEdit)
                    return (
                        <div className={styles.Review}>
                            {
                                id === commentIdForUpdate
                                ? <UpdateReviewForm
                                    text={r.text} 
                                    onReviewUpdate={onReviewUpdate}/>
                                : <Card 
                                    title={r.name}
                                    text={r.text}
                                    key={`${userId}-${i}`}
                                    className={cardClassName}/>
                            }
                            {r.editable &&
                                <>
                                <div className={styles.ReviewCardEdit}>
                                    <img src={editIcon} alt='edit icon' onClick={() => onReviewUpdateClick(id)}/>
                                </div>
                                <div className={styles.ReviewCardDelete}>
                                    <img src={deleteIcon} alt='delete icon' onClick={() => onReviewDelete(id)}/>
                                </div>
                                </>
                            }
                        </div>
                    )   
                })
            }
            { userId && <CreateReviewForm createReview={createReview}/> }

        </div>
    )
  
}


export default Reviews;
