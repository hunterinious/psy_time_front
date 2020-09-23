import React, { Component } from 'react'

const Buttons = (props) => {
    let key = props.itemsKey
    return (
        <div>
            {props.criteria[key].map((item, index) => (
                  <button 
                    id={`${key}-${index}`}
                    className={ props.setClassName(index, key) } >
                    {item.name}
                  </button>
            ))}
        </div>
    )
   
}

export default Buttons;