import React from 'react'
import classNames from 'classnames'

const Color = ({color, onClick, index, className}) => {
  let peg = <div className={classNames('color', {[color]: !className}, className)}></div>
  return onClick ? (<a href="#" onClick={(e) => onClick(e, color, index)}>{peg}</a>) : peg
}

export default Color
