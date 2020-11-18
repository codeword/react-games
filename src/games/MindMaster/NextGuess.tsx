import React from 'react'
import _ from 'lodash'
import { 
  ClueColor,
  CluePeg,
  FillPeg,
  PlayableColor
} from './gameCalculations'
import type { 
  Game,
  AnyColor,
} from './gameCalculations'
import Colors from './Colors'
import Clues from './Clues'


const NextGuess = ({handleGuess, game, guess, setGuess}: {handleGuess: (guess: PlayableColor[]) => void, game:Game, guess:AnyColor[], setGuess: React.Dispatch<React.SetStateAction<AnyColor[]>>}) => {
  let deselectColor = ({index:slotIndex}:{index: number}):void => {
    let nextGuess = guess.slice();
    nextGuess[slotIndex] = FillPeg.empty;
    setGuess(nextGuess);
  }

  let clues = _.range(guess.length).map(() => CluePeg[CluePeg.wrongColor]) as ClueColor[];
  return (
    <div className="next-guess">
      <div className="move">
        <Colors colors={guess} onClick={deselectColor} />
        <Clues clues={clues}/>
      </div>
      {/* <Colors colors={palette(game.colors, true)} onClick={selectColor} /> */}
    </div>
  );
}

export default NextGuess;