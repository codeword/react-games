import React from 'react'
import _ from 'lodash'
import { 
  ClueColor,
  CluePeg,
  FillPeg,
  MoveType,
} from './gameCalculations'
import type { 
  AnyColor,
} from './gameCalculations'
import Clue from './Clue'
import Pegs from './Pegs'
import { Move } from './Moves'


const NextGuess = ({guess, setGuess}: {guess:AnyColor[], setGuess: (guess:AnyColor[]) => void}) => {
  let deselectColor = ({index:slotIndex}:{index: number}):void => {
    let nextGuess = guess.slice();
    nextGuess[slotIndex] = FillPeg.empty;
    setGuess(nextGuess);
  }

  let clues = _.range(guess.length).map(() => CluePeg[CluePeg.wrongColor]) as ClueColor[];
  let move = {
    guess: guess,
    clue: clues
  } as MoveType
  return <Move key={99} {...{move, onClick:deselectColor}}/>;
}

export default NextGuess;