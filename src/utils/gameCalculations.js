function calculatePlayer(play) {
  return play%2===1 ? 'X' : '0';
}

function calculateWinner(squares) {
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

function gameStatus(squares, numMoves) {
  let winningSquares = calculateWinner(squares);
  let status = {};
  if(winningSquares) {
    status.winner = calculatePlayer(numMoves);
    status.winningSquares = winningSquares;
  } else if(numMoves === 9) {
    status.isTie = true;
  } else {
    status.player = calculatePlayer(numMoves+1);
  }
  return status;
}
export { gameStatus, calculatePlayer, calculateWinner };