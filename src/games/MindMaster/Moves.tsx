import React from 'react'
import Clue from './Clue'
import{ MoveType } from './gameCalculations'
import Pegs, { PegHandler } from './Pegs'

export const Move = ({move, key, onClick}: {move: MoveType, key: number, onClick?: PegHandler}) => (
  <li key={key} className="move">
    <div className="slots">
      <Pegs pegs={move.guess} onClick={onClick}/>
    </div>
    <Clue clues={move.clue}/>
  </li>
);

type MyProps = {moves: MoveType[], onClick?: PegHandler};
const Moves:React.FunctionComponent<MyProps> = ({moves, onClick, children}) => {
  return (
    <ol className="moves">
      {children}
      {moves.map((move, key) => <Move {...{move, key, onClick}}/>).reverse()}
    </ol>
  )
}

export default Moves
