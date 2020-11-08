import Square from './Square';
function keyFor(row, col) {
  return ['square', row, col].join("-")
}
export default function Board(props){
  const board = props.squares.map((row, rowIdx) => (
      <div className="board-row">
        {row.map((item, colIdx) => (
            <Square
              key={keyFor(rowIdx, colIdx)}
              data-testid={`square-${rowIdx}-${colIdx}`}
              value={item}
              onClick={() => props.onClick(rowIdx,colIdx)}
              isWinner={props.isWinner(rowIdx, colIdx)}
            />
        ))}
      </div>
  ))
  return <div>{board}</div>;
}
