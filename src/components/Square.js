export default function Square(props) {
  return (
    <button
      className={`square${props.isWinner ? ' winner' : ''}`}
      data-testid={props['data-testid']}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}