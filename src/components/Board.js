import Square from './Square';
export default function Board(props){
  const board = props.squares.map((row, rowIdx) => (
      <div
        key={rowIdx}
        className="board-row"
      >
        {row.map((item, colIdx) => (
            <Square
              preview={props.currentPlayer}
              key={colIdx}
              id={`square-${rowIdx}-${colIdx}`}
              value={item}
              onClick={() => props.onClick(rowIdx,colIdx)}
              isWinner={props.isWinner(rowIdx, colIdx)}
            />
        ))}
      </div>
  ))
  return <div className="game-board">{board}</div>;
}
