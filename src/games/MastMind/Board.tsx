import React, {useState} from 'react'
import Colors from './Colors'
import NextGuess from './NextGuess'
import { pallette, FillPeg, ColorPeg } from './gameCalculations'
import type { Game, Move, PlayableColor } from './gameCalculations'
import { newGameType } from './Game'
import Moves from './Moves'

function Code({game, isWinner}:{game: Game, isWinner: boolean}) {
  let colors = isWinner ? game.code : game.code.map(x => FillPeg.empty);
  return <div className="code"><Colors {...{colors}}/></div>
}
const NewGame = ({newGame: createGame, game}:{newGame:newGameType, game: Game}) => {
  const [colors, setColors] = useState(game.colors);
  const [slots, setSlots] = useState(game.slots);
  const [allowDupes, setDupes] = useState(game.allowDupes);

  let safeSetCounts = (newColors:ColorPeg, newSlots:number) => {
    if(newColors < 1 || 10 < newColors || newSlots < 1) return;
    let newDiff = newColors - newSlots;
    let currDiff = colors - slots;
    if(newDiff < 0) {
      setDupes(true);
    } else if (currDiff < 0) {
      setDupes(false);
    }
    setColors(newColors);
    setSlots(newSlots);
  }
  let onDupesChange = () => {
    if(slots <= colors) {
      setDupes(!allowDupes);
    }
  }
  return (
    <div>
      <div style={{display: 'flex'}}>
        <button onClick={() => safeSetCounts(colors-1, slots)}>-</button>
        <button onClick={() => safeSetCounts(colors+1, slots)}>+</button>
        <label>colors:</label>
        <span><Colors colors={pallette(colors)} /></span>
      </div>
      <div>
        <button onClick={() => safeSetCounts(colors, slots-1)}>-</button>
        <button onClick={() => safeSetCounts(colors, slots+1)}>+</button>
        <label>Slot Count:</label>
        <span>{slots}</span>
      </div>
      <div>
        <label htmlFor="allow-dupes">Allow Duplicate Pegs:</label>
        <input id="allow-dupes" type="checkbox" checked={allowDupes} onChange={onDupesChange} />
      </div>
      <button onClick={() => createGame(colors, slots, allowDupes)}> New Game </button>
    </div>
  );
}

type BoardProps = {
  game:Game,
  moves: Move[],
  handleGuess: (guess: PlayableColor[]) => void,
  newGame:newGameType,
  isWinner:boolean
}
export default function Board({game, moves, handleGuess, newGame, isWinner}:BoardProps){
  return (
    <div className="game-board masterMind" data-testid="game-board">
      <div className="controls">
        <NewGame {...{newGame, game}}/>
      </div>
      <div className="board">
        <Code {...{game, isWinner}}/>
        <Moves {...{moves, game}}/>
        <NextGuess {...{handleGuess, game}} />
      </div>
    </div>
  );
}
