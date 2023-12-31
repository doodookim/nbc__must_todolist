import React from 'react'

interface ButtonType {
    text:string;
    onClick: () => void
}

function Button({ text, onClick }:ButtonType) {
  return (
    <div 
        className='primary-btn'
        onClick={onClick}
    >
        {text}
    </div>
  )
}

export default Button