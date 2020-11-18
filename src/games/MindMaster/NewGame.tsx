import React, { useState } from 'react'
import Colors from './Colors';
import { newGameType } from './Game';
import { ColorPeg, Game, palette } from './gameCalculations';

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
        <span><Colors colors={palette(colors)} /></span>
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

export default NewGame
