import React from 'react';
import { Field, ErrorMessage } from 'formik';


function TextArea (props) {
  const { name, className, ...rest } = props

  return (
    <div className="form-group">
      <Field as='textarea' {...rest} name={name} rows="10" className={className}/>
      <ErrorMessage component={"div"} name={name} className="invalid-feedback"/>
    </div>
  )
}

export default TextArea;