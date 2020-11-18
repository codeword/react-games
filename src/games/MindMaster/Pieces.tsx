import React from 'react';
import { findIndex } from 'lodash';
import { Palette } from './Colors';
import { palette, FillPeg } from './gameCalculations';
import type { AnyColor, Game, PlayableColor } from './gameCalculations';

type PiecesProps = {
  game:Game, 
  guess:AnyColor[], 
  handleGuess: (guess: PlayableColor[]) => void, 
  setGuess: React.Dispatch<React.SetStateAction<AnyColor[]>>
}

export default function Pieces({game, guess, handleGuess, setGuess}:PiecesProps) { 
  let selectColor = ({color}:{color: PlayableColor}): void => {
    let slot = findIndex(guess, x => x === FillPeg[FillPeg.empty]);
    if(slot === -1) return;
    let nextGuess = guess.slice();
    nextGuess[slot] = color;
    if(slot === game.slots - 1) {
      handleGuess(nextGuess as PlayableColor[]);
    } else {
      setGuess(nextGuess);
    }
  }
  return (<div>
    <Palette colors={palette(game.colors, true)} onClick={selectColor} />
  </div>);
}