export default function Moves(props) {
  // return <MovesByPlayer {...{props}}/>
  const players = [
    <Player key='player-X' name="X"/>,
    <Player key='player-O' name="O"/>
  ];
  const moves = props.moves.map((move, id) => <Move {...{key:id, move:{id:id, ...move}, jumpTo:props.jumpTo}}/>);

  return <ul className="moves" data-testid="moves">{players}{moves}</ul>;
}
function Player(props) {
  return <li className={`header player player-${props.name}`}>{props.name}</li>;
}

function Move(props) {
  return (
    <li className="move" data-testid={`move-${props.move.id}`}>
      <button className="link-button" onClick={() => props.jumpTo(props.move.id)}>{`(${props.move.row}, ${props.move.col})`}</button>
    </li>
  );
}