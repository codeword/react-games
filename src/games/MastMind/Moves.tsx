import React from 'react'
import Colors from './Colors'
import Clues from './Clues'
import type{ Move } from './gameCalculations'

const StaticMove = ({move}: {move: Move}) => (
  <div className="move">
    <Colors colors={move.guess}/>
    <Clues clues={move.clue}/>
  </div> 
);

const Moves = ({moves} : {moves: Move[]}) => {
  if(moves.length === 0) return null;
  return (
    <ol reversed={true} className="moves">
      {moves.map((move, idx) => <li key={idx}><StaticMove {...{move}}/></li>)}
    </ol>
  )
}

export default Moves
