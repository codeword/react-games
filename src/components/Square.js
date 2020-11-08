import {useState} from 'react'
import classNames from 'classnames'

export default function Square(props) {
  const [isHover, setIsHover] = useState(false);
  let value = props.value;
  if(!value) value = isHover ? props.currentPlayer : '';
  return (
    <button
      className={classNames('square', props.className, {winner: props.isWinner})}
      data-testid={props.id}
      onClick={props.onClick}
      disabled={props.value}
      onMouseLeave={() => setIsHover(false)}
      onMouseEnter={() => setIsHover(true)}
    >
      {value}
    </button>
  );
}