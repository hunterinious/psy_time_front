import { useField } from 'formik';
import React, { useState, useEffect } from 'react';
import selectHelper from '../../../utils/selectHelper';
import styles from './FormComponents.module.scss';

export function RSelect (props) {
	const {SelectComponent, required, name, label, value, placeholder, options, isTimezone} = props
	const [selectOptions, setSelectOptions] = useState(options)
	const [field, meta, helpers] = useField(props);
	const [currentValue, setCurrentValue] = useState(value)

	useEffect(() => {
		if(isTimezone){
			setSelectOptions(selectHelper.mapSelectTimezoneOptions(options))
		}else{
			setSelectOptions(selectHelper.mapSelectOptions(options))
		}
	}, [options]);


	useEffect(() => {
		if(value && isTimezone){
			setCurrentValue(selectHelper.timezoneToSelectOptionObject(value))
		}else if(value){
			setCurrentValue(selectHelper.toSelectOptionObject(value))
		}else {
			// for case when current select value reseted by another select(user change country, need to select city)
			setCurrentValue(null)
		}
	}, [value]);

	
	let selectRef = null;
	const setSelectRef = (ref) => {
		selectRef = ref;
	};

	const handleChange = (option) => {
		helpers.setValue(option.value)
		setCurrentValue(option)

		if(props.onChange){
			props.onChange(option)
		}
	}

	return (
		<div className="mb-3">
		<label htmlFor={name} className="form-label">{label}</label>
		<SelectComponent
			ref={setSelectRef}
			placeholder={placeholder}
			name={name}
			options={selectOptions}
			value={currentValue}
			onChange={handleChange}
			/>
		{required && (
			<input
				tabIndex={-1}
				autoComplete="off"
				className={styles.SelectError}
				value={currentValue?.value}
				onFocus={() => selectRef.focus()}
				required={required}
			/>
			)}
		</div>
	)
}