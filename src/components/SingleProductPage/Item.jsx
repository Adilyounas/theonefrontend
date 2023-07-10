import React from 'react'
import "./singleProductCarausol.css"

const Item = ({item}) => {
  return (
    <div className='singleProductCarausol'>
        <img src={item.url} alt={item.public_id} />
    </div>
  )
}

export default Item