import React from 'react';
import Input from '../FormComponents/Input';
import TextArea from '../FormComponents/TextArea';
import ReactSelect from "react-select";
import { RSelect } from '../FormComponents/Select';
import { useField } from 'formik'


const FormikControl = (props) => {
  const [field, meta] = useField(props)
  const c = props.className
  const className = meta.error && meta.touched ? `${c} is-invalid` : c

  const { control, ...rest } = props

  switch (control) {
    case 'input':
      return <Input {...rest} className={className}/>
    case 'textarea':
      return <TextArea {...rest} className={className}/>
    case 'rselect':
      return <RSelect {...rest} className={className} SelectComponent={ReactSelect}/>
    default:
      return null
  }
}

export default FormikControl;