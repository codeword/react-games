import React from 'react'
import NextGuess from './NextGuess'
import { AnyColor, FillPeg } from './gameCalculations'
import type { GameType, MoveType, PlayableColor } from './gameCalculations'
import { newGameType } from './Game'
import Moves from './Moves'
import Pegs from './Pegs'

function Code({game, isWinner}:{game: GameType, isWinner: boolean}) {
  let colors = isWinner ? game.code : game.code.map(x => FillPeg.empty);
  return <div className="code"><Pegs {...{pegs:colors}}/></div>
}

type BoardProps = {
  game:GameType,
  moves: MoveType[],
  handleGuess: (guess: PlayableColor[]) => void,
  newGame:newGameType,
  isWinner:boolean
  guess: AnyColor[],
  setGuess: (guess:AnyColor[]) => void
}
export default function Board({game, moves, handleGuess, newGame, isWinner, guess, setGuess}:BoardProps){
  return (
    <div className="board">
      <Code {...{game, isWinner}}/>
      <Moves {...{moves, game}}>
        {!isWinner && <NextGuess {...{handleGuess, game, guess, setGuess}} />}
      </Moves>
    </div>
  );
}
