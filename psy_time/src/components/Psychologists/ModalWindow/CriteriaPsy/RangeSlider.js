import React from 'react'
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;


const handle = props => {
    const { value, dragging, index, overlayClassName, ...restProps} = props;
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        visible={dragging}
        placement="bottom"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };
  

const RangeSlider = (props) => {
    return (
        <div>
            <Range value={props.value}
                    min={props.min}
                    max={props.max}
                    onChange={props.onChange}
                    handle={handle}
                    tipFormatter={props.tipFormatter}
            />
        </div>
    )
}

export default RangeSlider;
