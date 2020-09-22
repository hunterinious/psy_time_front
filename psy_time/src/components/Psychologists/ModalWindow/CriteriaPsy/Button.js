import React, { Component } from 'react'

const Button = (props) => {
    let key = props.itemsKey
    return (
        <div>
            {props.criteria[key].map((item, index) => (
                  <button 
                    id={`${key}-${index}`}
                    onClick={ (e) => props.handleCriterionClick(e) }
                    className={ props.setClassName(index, key) } >
                    {item.name}
                  </button>
            ))}
        </div>
    )
   
}

export default Button;