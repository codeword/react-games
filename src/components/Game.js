import React from 'react'
import Board from './Board';

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
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick = (row,col) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = this.state.history[history.length -1];
    if(this.calculateWinner(current.squares) || current.squares[row][col]) return;
    const squares = current.squares.map(r => r.slice());
    squares[row][col] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{ squares: squares}]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      moves: this.state.moves.concat([[row, col]]),
    });
  }

  calculateWinner(squares) {
    const lines = [
      [[0,0], [0,1], [0,2]],
      [[1,0], [1,1], [1,2]],
      [[2,0], [2,1], [2,2]],
      [[0,0], [1,0], [2,0]],
      [[0,1], [1,1], [2,1]],
      [[0,2], [1,2], [2,2]],
      [[0,0], [1,1], [2,2]],
      [[0,2], [1,1], [2,0]],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a[0]][a[1]] && squares[a[0]][a[1]] === squares[b[0]][b[1]] && squares[a[0]][a[1]] === squares[c[0]][c[1]]) {
        return lines[i];
      }
    }
    return null;
  }

  calculateStatus(winner, xIsNext) {
    if(winner) {
      const squares = this.state.history[this.state.history.length-1].squares;
      return `Winner: ${squares[winner[0][0]][winner[0][1]]}`;
    } else if(this.state.moves.length === 9) {
      return 'Cats Game!'
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`
    }
  }

  jumpTo(move) {
    const history = this.state.history.slice(0,move+1)
    this.setState({
      history: history,
      stepNumber: history.length-1,
      xIsNext: !!(history.length%2),
      moves: this.state.moves.slice(0,move),
    });
  }

  render() {
    const current = this.state.history[this.state.stepNumber];
    let winner = this.calculateWinner(current.squares);
    const status = this.calculateStatus(winner, this.state.xIsNext);

    const moves = this.state.moves.map((move, idx) => {
      const desc = `${current.squares[move[0]][move[1]]} played (${move}) :`;
      const buttonDesc = idx ? 'Undo' : 'Start Over';
      return (
        <li key={move}>
          {desc}<button onClick={() => this.jumpTo(idx)}>{buttonDesc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            isWinner={(row, col) => winner && winner.some((item) => item[0] === row && item[1] === col)}
            squares={current.squares}
            onClick={this.handleClick.bind(this)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
