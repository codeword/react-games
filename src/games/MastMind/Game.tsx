import React, {useState} from 'react';
import Board from './Board';
import { ColorPeg, createGame, evaluateGuess, PlayableColor, isWinner as foo} from './gameCalculations';
import type { Move } from './gameCalculations';
import NewGame from './NewGame';

export type newGameType = (pegCount:ColorPeg, slotCount:number, allowDupes:boolean) => void;

export default function Game() {
  const [game, setGame] = useState(createGame(ColorPeg.c6,4,false));
  const [moves, setMoves] = useState([] as Move[]);

  const addMove = (move:Move) => {
    setMoves(pastMoves => [...pastMoves, move]);
  }

  const newGame:newGameType = (pegCount, slotCount, allowDupes) => {
    setMoves([]);
    setGame(createGame(pegCount, slotCount, allowDupes))
  }

  const handleGuess = (guess:PlayableColor[]) => {
    if(game.code.length && !isWinner()) {
      addMove({ guess, clue: evaluateGuess(game.code, guess) });
    }
  }
  const isWinner = ():boolean => {
    let lastMove = moves[moves.length-1];
    return game.code.length > 0 && lastMove && foo(game.code, lastMove.clue);
  }

  return (
    <div className="game MasterMind">
      <div className="controls">
        <NewGame {...{newGame, game}}/>
      </div>
      <Board {...{game, moves, handleGuess, newGame, isWinner:isWinner()}} />
    </div>
  );
}
