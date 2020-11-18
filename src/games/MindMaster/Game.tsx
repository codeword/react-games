import React, {useCallback, useEffect, useState} from 'react';
import Board from './Board';
import { createGame, evaluateGuess, isWinner, ColorPeg, FillPeg} from './gameCalculations';
import type { PlayableColor, AnyColor, EmptyColor} from './gameCalculations';
import type { Move } from './gameCalculations';
import NewGame from './NewGame';
import {fill} from 'lodash';
import Pieces from './Pieces';

export type newGameType = (pegCount:ColorPeg, slotCount:number, allowDupes:boolean) => void;

export default function Game() {
  
  const [game, setGame] = useState(createGame(ColorPeg.c6,4,false));
  const [moves, setMoves] = useState([] as Move[]);
  let reset: () => EmptyColor[] = useCallback(() => {
    return fill(Array(game.slots), FillPeg[FillPeg.empty]) as EmptyColor[];

  },[game.slots]);
  const [guess, setGuess] = useState(reset() as AnyColor[]);

  useEffect(() => {
    setGuess(reset());
  }, [reset]);

  const addMove = (move:Move) => {
    setMoves(pastMoves => [...pastMoves, move]);
  }

  const newGame:newGameType = (pegCount, slotCount, allowDupes) => {
    setMoves([]);
    setGame(createGame(pegCount, slotCount, allowDupes))
  }

  const handleGuess = (theGuess:PlayableColor[]) => {
    setGuess(reset());
    if(game.code.length && !won()) {
      addMove({ guess:theGuess, clue: evaluateGuess(game.code, theGuess) });
    }
  }
  const won = ():boolean => {
    let lastMove = moves[moves.length-1];
    return game.code.length > 0 && lastMove && isWinner(game.code, lastMove.clue);
  }

  return (
    <div className="game MindMaster">
      <div className="controls">
        <NewGame {...{newGame, game}}/>
      </div>
      <Pieces {...{game, guess, handleGuess, setGuess}}/>
      <Board {...{game, moves, handleGuess, newGame, isWinner:won(), guess, setGuess}} />
    </div>
  );
}
