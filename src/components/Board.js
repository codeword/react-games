import Square from './Square';

export default function Board(props){
  const board = props.squares.map((row, rowIdx) => (
      <div className="board-row">
        {row.map((item, colIdx) => (
            <Square
              value={item}
              onClick={() => props.onClick(rowIdx,colIdx)}
              isWinner={props.isWinner(rowIdx, colIdx)}
            />
        ))}
      </div>
  ))
  return <div>{board}</div>;
}
