import {useState} from 'react'
import classNames from 'classnames'

export default function Square(props) {
  const [isHover, setIsHover] = useState(false);
  let value = props.value;
  if(!value) value = isHover ? props.preview : '';
  return (
    <button
      className={classNames('square', props.className, {winner: props.isWinner})}
      data-testid={props.id}
      onClick={() => {
        props.onClick();
        setIsHover(false);
      }}
      disabled={props.value}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {value}
    </button>
  );
}