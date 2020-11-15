import React from 'react'
import { ClueColor, CluePeg } from './gameCalculations'
import Swatch from './Swatch';

const Clues = (params: {clues: CluePeg[]}) => (
  <ul className="clues">
    {params.clues.map((clue:CluePeg, idx:number) => (
      <li key={idx}>
        {<Swatch color={CluePeg[clue] as ClueColor}/>}
      </li>
    ))}
  </ul>
)

export default Clues;