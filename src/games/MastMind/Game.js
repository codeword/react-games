import {useState} from 'react';
// import classNames from "classnames";
import Board from './Board';
import * as Calc from './gameCalculations'

export default function Game() {
  const [code, setCode] = useState(Calc.newCode(4,4,false));
  const [moves, setMoves] = useState([]);

  const addMove = (move) => {
    setMoves(pastMoves => [...pastMoves, move]);
  }

  const newGame = (pegCount, slotCount, allowDupes) => {
    setMoves([]);
    setCode(Calc.newCode(pegCount, slotCount, allowDupes))
  }

  const handleGuess = (guess) => {
    if(code.value.length && !isWinner()) {
      addMove({ guess, clue: Calc.evaluateGuess(code.value, guess) });
    }
  }
  const isWinner = () => {
    let lastMove = moves[moves.length-1];
    return code.value.length && lastMove && Calc.isWinner(code.value, lastMove.clue);
  }

  return (
    <div>
      <Board {...{code, moves, handleGuess, newGame, isWinner:isWinner()}} />
    </div>
  );
}
