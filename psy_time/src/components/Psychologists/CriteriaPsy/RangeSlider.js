import React from 'react'
import Slider from '@mui/material/Slider';


const RangeSlider = (props) => {
	const {value, min, max, onChange, valueLabelDisplay, sx} = props

	return (
		<Slider
			value={value}
			defaultValue={value}
			min={min}
			max={max}
			onChange={onChange}
			valueLabelDisplay={valueLabelDisplay}
			sx={sx}
		/>

	)
}

export default RangeSlider;
