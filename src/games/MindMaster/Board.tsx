import React from 'react'
import Colors from './Colors'
import NextGuess from './NextGuess'
import { AnyColor, FillPeg } from './gameCalculations'
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
  guess: AnyColor[],
  setGuess: React.Dispatch<React.SetStateAction<AnyColor[]>>
}
export default function Board({game, moves, handleGuess, newGame, isWinner, guess, setGuess}:BoardProps){
  return (
    <div className="board">
      <Code {...{game, isWinner}}/>
      <NextGuess {...{handleGuess, game, guess, setGuess}} />
      <Moves {...{moves, game}}/>
    </div>
  );
}
