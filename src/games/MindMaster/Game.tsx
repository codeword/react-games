import React, { useCallback, useEffect, useState } from 'react';
import Board from './Board';
import { createGame, evaluateGuess, isWinner, ColorPeg, FillPeg, CluePeg } from './gameCalculations';
import type { PlayableColor, AnyColor, EmptyColor } from './gameCalculations';
import type { MoveType } from './gameCalculations';
import { fill, findIndex, times } from 'lodash';
import Palette from './Palette';

export type newGameType = (pegCount: ColorPeg, slotCount: number, allowDupes: boolean) => void;

export default function Game() {

  const [game, setGame] = useState(createGame(ColorPeg.c6, 4, false));
  const [moves, setMoves] = useState([] as MoveType[]);
  let reset: () => EmptyColor[] = useCallback(() => {
    return fill(Array(game.slots), FillPeg[FillPeg.empty]) as EmptyColor[];

  }, [game.slots]);
  const [guess, setGuess] = useState(reset() as AnyColor[]);

  useEffect(() => {
    setGuess(reset());
  }, [reset]);

  const addMove = (move: MoveType) => {
    setMoves(pastMoves => [...pastMoves, move]);
  }

  const newGame: newGameType = (pegCount, slotCount, allowDupes) => {
    setMoves([]);
    setGame(createGame(pegCount, slotCount, allowDupes))
  }

  const customSetGuess = (theGuess: AnyColor[]) => {
    let slot = findIndex(theGuess, x => x === FillPeg[FillPeg.empty]);
    if (slot === -1) {
      handleGuess(theGuess as PlayableColor[]);
    } else {
      setGuess(theGuess);
    }

  }

  const handleGuess = (theGuess: PlayableColor[]) => {
    setGuess(reset());
    if (game.code.length && !won()) {
      addMove({ guess: theGuess, clue: evaluateGuess(game.code, theGuess) });
    }
  }
  const won = (): boolean => {
    let lastMove = moves[moves.length - 1];
    return game.code.length > 0 && lastMove && isWinner(game.code, lastMove.clue);
  }

  let style = {
    '--peg-count': game.colors,
    '--slot-count': game.slots
  } as React.CSSProperties

  let movesToDisplay;
  if (moves.length < 10) {
    movesToDisplay = times(10 - moves.length, () => {
      let theGuess = times(game.slots).map(() => FillPeg[FillPeg.empty]) as EmptyColor[];
      let theClue = times(game.slots).map(() => CluePeg[CluePeg.wrongColor]);
      return { guess:theGuess, clue:theClue } as MoveType;
    }).concat(moves)
  } else {
    movesToDisplay = moves;
  }

  return (
    <div className="MindMaster master-mind game" style={style}>
      <Palette {...{ game, guess, handleGuess, setGuess: customSetGuess }} />
      <Board {...{ game, moves: movesToDisplay, handleGuess, newGame, isWinner: won(), guess, setGuess: customSetGuess }} />
      {/* <div className="controls">
        <NewGame {...{ newGame, game }} />
      </div> */}
    </div>
  );
}
