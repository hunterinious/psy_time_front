import React from 'react';
import { Field, ErrorMessage } from 'formik';


function TextArea (props) {
  const { name, label, className, ...rest } = props

  return (
    <div className="form-group">
       <label htmlFor={name}>{label}</label>
      <Field as='textarea' {...rest} name={name} rows="10" className={className}/>
      <ErrorMessage component={"div"} name={name} className="invalid-feedback"/>
    </div>
  )
}

export default TextArea;