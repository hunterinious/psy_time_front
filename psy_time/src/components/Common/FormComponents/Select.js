
import React from 'react';
import { Field, ErrorMessage } from 'formik';

function Select (props) {
  const { name, options, className, ...rest } = props

  return (
    <div className="form-group">
      <Field as='select' {...rest} name={name} className={className}>
        { options.map(option => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          )
        })}
      </Field>
      <ErrorMessage component={"div"} name={name} className="invalid-feedback"/>
    </div>
  )
}

export default Select;