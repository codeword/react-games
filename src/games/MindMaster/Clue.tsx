import React from 'react'
import { ClueColor } from './gameCalculations'
import Pegs from './Pegs';

const Clue = (params: {clues: ClueColor[]}) => (
  <div className="clue">
    <Pegs pegs={params.clues}/>
  </div>
)

export default Clue;