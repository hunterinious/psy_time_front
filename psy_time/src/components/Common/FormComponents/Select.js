import React from 'react';
import style from './FormComponents.module.scss'


export function RSelect (props) {
  const {SelectComponent, required, name, label, value, placeholder, options} = props

  let selectRef = null;
  const setSelectRef = (ref) => {
      selectRef = ref;
  };

  const handleChange = (option) => {
      const optionValue = option.value
      if(props.onChange){
         props.onChange(optionValue)
      }
  }

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <SelectComponent
        ref={setSelectRef}
        placeholder={placeholder}
        name={name}
        options={options}
        value={value}
        defaultValue={value}
        onChange={handleChange}
      />
      {required && (
          <input
            tabIndex={-1}
            autoComplete="off"
            className={style.SelectError}
            value={value}
            onFocus={() => selectRef.focus()}
            required={required}
          />
        )}
    </div>
  )
}