import React from 'react'
import Colors from './Colors'
import NextGuess from './NextGuess'
import { FillPeg } from './gameCalculations'
import type { Game, Move, PlayableColor } from './gameCalculations'
import { newGameType } from './Game'
import Moves from './Moves'

function Code({game, isWinner}:{game: Game, isWinner: boolean}) {
  let colors = isWinner ? game.code : game.code.map(x => FillPeg.empty);
  return <div className="code"><Colors {...{colors}}/></div>
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
    <div className="board">
      <Code {...{game, isWinner}}/>
      <Moves {...{moves, game}}/>
      <NextGuess {...{handleGuess, game}} />
    </div>
  );
}
