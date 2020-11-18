import React from 'react'
import Colors from './Colors'
import Clues from './Clues'
import{ ClueColor, CluePeg, EmptyColor, FillPeg, Game, Move } from './gameCalculations'
import _ from 'lodash'

const StaticMove = ({move}: {move: Move}) => (
  <div className="move">
    <Colors colors={move.guess}/>
    <Clues clues={move.clue as ClueColor[]}/>
  </div> 
);


const Moves = (props : {moves: Move[], game: Game}) => {
  let moves;
  if(props.moves.length < 10) {
    moves = _.times(10 - props.moves.length, () => {
      let guess = _.times(props.game.slots).map(() => FillPeg[FillPeg.empty]) as EmptyColor[];
      let clue = _.times(props.game.slots).map(() => CluePeg[CluePeg.wrongColor]) as ClueColor[];
      return { guess, clue } as Move;
    }).concat(props.moves)
  } else {
    moves = props.moves;
  }
  return (
    <ol className="moves">
      {moves.slice().reverse().map((move, idx) => <li key={idx}><StaticMove {...{move}}/></li>)}
    </ol>
  )
}

export default Moves
