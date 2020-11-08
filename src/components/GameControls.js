export function GameStatus(props) {
  let content = (status) => {
    if(status.winner) {
      return `Winner: ${status.winner}`;
    } else if(status.isTie) {
      return 'Cats Game!'
    } else {
      return `Next player: ${status.player}`
    }
  };
  return (
    <div>{content(props.status)}</div>
  );
}
export function Moves(props) {
  const moves = props.moves.map((move, idx) => {
    const desc = `${move.player} played (${move.row}, ${move.col}) :`;
    const buttonDesc = idx ? 'Undo' : 'Start Over';
    let id = `move-${idx}`;
    return (
      <li key={id} data-testid={id}>
        {desc}<button onClick={() => props.jumpTo(idx)}>{buttonDesc}</button>
      </li>
    );
  });

  return <ol data-testid="moves">{moves}</ol>;
}
