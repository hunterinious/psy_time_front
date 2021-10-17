import React from 'react'
import { Field, ErrorMessage} from 'formik'


const Input = (props) => {
  const { name, label, className } = props

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>
      <Field {...props} name={name} className={className}/>
      <ErrorMessage component={"div"} name={name} className="invalid-feedback" />
    </div>
  )
}

export default Input