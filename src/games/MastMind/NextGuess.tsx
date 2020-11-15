import React, {useState, useEffect, useCallback} from 'react'
import _ from 'lodash'
import { 
  CluePeg,
  EmptyColor,
  FillPeg,
  pallette,
  PlayableColor
} from './gameCalculations'
import type { 
  Game,
  AnyColor,
} from './gameCalculations'
import Colors from './Colors'
import Clues from './Clues'

const NextGuess = ({handleGuess, game}: {handleGuess: (guess: PlayableColor[]) => void, game:Game}) => {
  let reset: () => EmptyColor[] = useCallback(() => {
    return _.fill(Array(game.slots), FillPeg[FillPeg.empty]) as EmptyColor[];

  },[game.slots]);

  const [guess, setGuess] = useState(reset() as AnyColor[]);

  useEffect(() => {
    setGuess(reset());
  }, [reset]);

  let nextSlot = () => _.findIndex(guess, peg => peg === FillPeg.empty);

  let selectColor = (color: PlayableColor, _idx: number): void => {
    let slot = nextSlot();
    if(slot === -1) return;
    let nextGuess = guess.slice();
    nextGuess[slot] = color;
    if(slot === game.slots - 1) {
      setGuess(reset());
      handleGuess(nextGuess as PlayableColor[]);
    } else {
      setGuess(nextGuess);
    }
  }

  let deselectColor = (_c: AnyColor, slotIndex: number): void => {
    console.log(guess.length);
    let nextGuess = guess.slice();
    nextGuess[slotIndex] = FillPeg.empty;
    setGuess(nextGuess);
  }

  let clues = _.range(guess.length).map(() => CluePeg.wrongColor) as CluePeg[];
  return (
    <div className="next-guess">
      <div className="move">
        <Colors colors={guess} onClick={deselectColor} />
        <Clues clues={clues}/>
      </div>
      <Colors colors={pallette(game.colors, true)} onClick={selectColor} />
    </div>
  );
}

export default NextGuess;