import cn from 'classnames'
import React from 'react';
import RSelect from "react-select";
import { ErrorMessage, useField } from 'formik';


export function ReactSelect (props) {
  const { name, label, value, options } = props

  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <RSelect
        name={name}
        options={options}
        defaultValue={value}
        onChange={option=>setValue(option.value)}
      />
      <ErrorMessage component={"div"} name={name} className="invalid-feedback"/>
    </div>
  )
}