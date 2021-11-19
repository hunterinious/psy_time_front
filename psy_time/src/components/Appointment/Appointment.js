import React, {useState} from 'react';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormikControl from '../Common/FormControl/FormikControl';
import appointmentService from '../../services/appointmentService';
import SubmitButton from '../Common/Buttons/SubmitButton/SubmitButton';
import telegramIcon from '../../assets/images/telegram-icon.png';
import whatsAppIcon from '../../assets/images/whats-app-icon.png';
import styles from './Appointment.module.scss'

const WHATS_APP = 'WHATS_APP';
const TELEGRAM = 'TELEGRAM';

const Appointment = (props) => {
    const {hideModal, psyId} = props
    const [contactType, setContactType] = useState(WHATS_APP)

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
            if(hideModal) hideModal()
        }

        const {email, name} = values
        let {whatsapp_phonenumber, telegram_nickname} = values
        whatsapp_phonenumber = whatsapp_phonenumber || null
        telegram_nickname = telegram_nickname || null
        

        appointmentService.callAppointmentRequest(
            {email, name, whatsapp_phonenumber, telegram_nickname, psychologist_profile: psyId},
            onSuccess, onFail
        )
    }

    const onSelectContactTypeClick = (e) => {
        setContactType(e.currentTarget.id)
    }


    const initialValues = {
        email: '',
        name: '',
        whatsapp_phonenumber: '',
        telegram_nickname: ''
    }

    
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
        name: Yup.string()
                .required('Required')
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
        whatsapp_phonenumber: Yup.string()
            .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, 'Phone number is not valid')
            .when('telegram_nickname', {
                is: (nickname) => !nickname || nickname.length === 0,
                then: Yup.string().required('You must provide telegram nickname or whatsapp phonenumber'),
                otherwise: Yup.string().notRequired()
            }),
        telegram_nickname:
            Yup.string()
                .min(5, 'Must be must be longer than 4 character(s)')
                .max(50, 'Must be must be no longer than 50 character(s)')
                .test('starts with', 'Must starts with @', val => !val.startsWith('@'))
                .when('whatsapp_phonenumber', {
                    is: (phonenumber) => !phonenumber || phonenumber.length === 0,
                    then: Yup.string().required('You must provide telegram nickname or whatsapp phonenumber'),
                    otherwise: Yup.string().notRequired()
                })
        [['whatsapp_phonenumber', 'telegram_nickname']]
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
                        <div className={styles.AppointmentFormContactTypes}>
                            <div className={styles.AppointmentFormContactType} id={WHATS_APP} onClick={onSelectContactTypeClick}>
                                <div className={styles.AppointmentFormContactTypeImage}>
                                    <img src={whatsAppIcon} alt='whats appicon'/>
                                </div>
                                <div className={styles.AppointmentFormContactTypeText}>
                                    WhatsApp
                                </div>
                            </div>
                            <div className={styles.AppointmentFormContactType} id={TELEGRAM} onClick={onSelectContactTypeClick}>
                                <div className={styles.AppointmentFormContactTypeImage}>
                                    <img src={telegramIcon} alt='telegram icon'/>
                                </div>
                                <div className={styles.AppointmentFormContactTypeText}>
                                    Telegram
                                </div>
                            </div>
                        </div>
                        {contactType === TELEGRAM
                            ? 
                            <FormikControl
                                className="form-control"
                                control='input'
                                type='text'
                                name='telegram_nickname'
                                label='Enter your nickname'
                                placeholder='@name'
                            />
                            :
                            <FormikControl
                                className="form-control"
                                control='input'
                                type='tel'
                                name='whatsapp_phonenumber'
                                label='Enter your phonenumber'
                                placeholder='+380 ...'
                            />
                        }
                    </div>
                </div>
                <SubmitButton type='submit' className={styles.SubmitButton}>Submit</SubmitButton>
            </Form>
            )}
          </Formik>
        </div>
    )
}

export default Appointment;
