import React from 'react';
import { findIndex } from 'lodash';
import { palette, FillPeg } from './gameCalculations';
import type { AnyColor, GameType, PlayableColor } from './gameCalculations';
import Pegs from './Pegs';

type PiecesProps = {
  game:GameType, 
  guess:AnyColor[], 
  setGuess: (guess: AnyColor[]) => void
}

export default function Palette({game, guess, setGuess}:PiecesProps) { 
  let onClick = ({color}:{color: PlayableColor}): void => {
    let slot = findIndex(guess, x => x === FillPeg[FillPeg.empty]);
    if(slot === -1) return;
    let nextGuess = guess.slice();
    nextGuess[slot] = color;
    setGuess(nextGuess);
  }
  let colors = palette(game.colors, true) as AnyColor[];
  return (
    <ul className="palette">
      <Pegs pegs={colors} onClick={onClick}/>
    </ul>
  );
}

