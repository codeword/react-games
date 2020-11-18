import React from 'react'
import { ClueColor } from './gameCalculations'
import toSwatches from './Swatches';

const Clues = (params: {clues: ClueColor[]}) => (
  <ul className="clues">
    {params.clues.map(toSwatches())}
  </ul>
)

export default Clues;