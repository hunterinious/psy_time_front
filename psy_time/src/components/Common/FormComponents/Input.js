import React from 'react'
import { Field, ErrorMessage} from 'formik'


const Input = (props) => {
  const { name, label, className } = props

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Field {...props} name={name} className={className}/>
      <ErrorMessage component={"div"} name={name} className="invalid-feedback" />
    </div>
  )
}

export default Input