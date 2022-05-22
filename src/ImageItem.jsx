import React from 'react'

export default function ImageItem({ item, changeClick }) {

  const handleClick = (id) => {
    changeClick([id,true])
  }

  return (
    <div className='image-item'>
      <img
        src={item.image}
        alt={item}
        onClick={() => handleClick(item.id)}
      />
      <span className='image-item-title'>{item.title}</span>
    </div>
      )
}
