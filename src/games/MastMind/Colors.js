import React from 'react'
import Color from './Color'

const Colors = ({colors, onClick}) => {
  return (
    <ul className="colors">
      {colors.map((color, index) => (<li key={index}><Color {...{color, onClick, index, className:`c${color}`}}/></li>))}
    </ul>
  );
}

export default Colors;