export default function GameStatus(props) {
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
    <div data-testid="game-stats">{content(props.status)}</div>
  );
}
