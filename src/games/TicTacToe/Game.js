import React from 'react'
import classNames from "classnames";
import Board from './Board';
import GameStatus from './GameStatus';
import Moves from './Moves';
import * as Calc from './gameCalculations'

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: [
          [null ,null, null],
          [null ,null, null],
          [null ,null, null],
        ],
      }],
      moves: [],
    }
  }

  handleClick = (row,col) => {
    const currentSquares = this.state.history[this.state.history.length-1].squares;

    if(Calc.calculateWinner(currentSquares) || currentSquares[row][col]) return;

    const player = Calc.calculatePlayer(this.state.moves.length+1);
    const nextSquares = currentSquares.map(r => r.slice());
    nextSquares[row][col] = player;
    this.setState({
      history: this.state.history.concat([{ squares: nextSquares}]),
      moves: this.state.moves.concat([{player: player, row, col}]),
    });
  }

  jumpTo(move) {
    this.setState({
      history: this.state.history.slice(0,move+1),
      moves: this.state.moves.slice(0,move),
    });
  }

  render() {
    const current = this.state.history[this.state.history.length-1];
    let winningSquares = Calc.calculateWinner(current.squares);
    let gameStatus = Calc.gameStatus(current.squares, this.state.moves.length);
    return (
      <div className={classNames("game", "TicTacToe", {over: !!winningSquares})}>
        <Board
          currentPlayer={gameStatus.player}
          isWinner={(row, col) => winningSquares && winningSquares.some((item) => item[0] === row && item[1] === col)}
          squares={current.squares}
          onClick={this.handleClick.bind(this)}
        />
        <div className="game-info">
          <GameStatus status={gameStatus}/>
          <Moves moves={this.state.moves} jumpTo={this.jumpTo.bind(this)}/>
        </div>
      </div>
    );
  }
}
