
import {useState, useEffect} from 'react';
import classNames from 'classnames'
import _ from 'lodash';

function Code({code, isWinner}) {
  let colors = isWinner ? code.value : code.value.map(x => 11);
  return <div className="code"><Colors {...{colors}}/></div>
}

function Moves({moves, code}) {
  if(moves.length === 0) return null;
  return (
    <ol reversed={true}>
      {moves.map((move, idx) => <li key={idx}><Move {...{move, code}}/></li>)}
    </ol>
  )
}
function Move({move, code}) {
  let guesses = <Colors colors={move.guess}/>
  let clueColor = (clue) => {
    if(clue === undefined) {
      return 'c10';
    } else if(clue === 0) {
      return 'wrongSpot';
    } else {
      return 'rightSpot';
    }
  }
  let clues = (
    <ul className="clues">
      {_.range(code.slots).map(slot => (
        <li key={slot}>
          {<Color color={clueColor(move.clue[slot])}/>}
        </li>
      ))}
    </ul>
  );
  return <div className="move">
    {guesses}
    {clues}
  </div> 
}

function NextGuess({handleGuess, code}) {
  let reset = () => _.times(code.slots, _.constant(10));
  const [guess, setGuess] = useState(reset());

  useEffect(() => {
    if(guess.length != code.slots) {
      setGuess(reset());
    }
  });
  let nextSlot = () => _.findIndex(guess, v => v===10);

  let select = (e, color, index) => {
    e.preventDefault();
    let slot = nextSlot();
    if(slot == -1) return;
    let nextGuess = guess.slice();
    nextGuess[slot] = color;
    if(slot == code.slots - 1) {
      setGuess(reset());
      handleGuess(nextGuess);
    } else {
      setGuess(nextGuess);
    }
  };

  let deSelect = (e, color, idx) => {
    e.preventDefault();
    console.log(guess.length);
    let nextGuess = guess.slice();
    nextGuess[idx] = 10;
    setGuess(nextGuess);
  }
  return (
    <div className="next-guess">
      <Colors colors={guess} onClick={deSelect} />
      <Colors colors={[...(_.range(code.colors)), 11]} onClick={select} />
    </div>
  );
}
function Colors({colors, onClick}) {
  return (
    <ul className="colors">
      {colors.map((color, index) => (<li key={index}><Color {...{color, onClick, index, className:`c${color}`}}/></li>))}
    </ul>
  );
}
function Color({color, onClick, index, className}) {
  let peg = <div className={classNames('color', {[color]: !className}, className)}></div>;
  return onClick ? (<a href="#" onClick={(e) => onClick(e, color, index)}>{peg}</a>) : peg;
}

function NewGame({newGame, code}) {
  const [colors, setColors] = useState(code.colors);
  const [slots, setSlots] = useState(code.slots);
  const [allowDupes, setDupes] = useState(code.allowDupes);

  let safeSetCounts = (newColors, newSlots) => {
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
        <span><Colors colors={_.range(colors)} /></span>
      </div>
      <div>
        <button onClick={() => safeSetCounts(colors, slots-1)}>-</button>
        <button onClick={() => safeSetCounts(colors, slots+1)}>+</button>
        <label>Slot Count:</label>
        <span>{slots}</span>
      </div>
      <div>
        <label for="allow-dupes">Allow Duplicate Pegs:</label>
        <input id="allow-dupes" type="checkbox" checked={allowDupes} onChange={onDupesChange} />
      </div>
      <button onClick={() => newGame(colors, slots, allowDupes)}> New Game </button>
    </div>
  );
}
export default function Board({code, moves, handleGuess, newGame, isWinner}){
  return (
    <div className="game-board masterMind" data-testid="game-board">
      <div className="controls">
        <NewGame {...{newGame, code}}/>
      </div>
      <div className="board">
        <Code {...{code, isWinner}}/>
        <Moves {...{moves, code}}/>
        <NextGuess {...{handleGuess, code}} />
      </div>
    </div>
  );
}
