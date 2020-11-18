import React from 'react'
import classNames from 'classnames/dedupe'

type LinkButtonProps = React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>;
export type ButtonEventType = React.MouseEvent<HTMLButtonElement, MouseEvent>

const LinkButton: LinkButtonProps = ({className, ...props}) => {
  return (
    <button {...{
      className: classNames(className, 'link-button'), 
      ...props
    }} />
  );
};

export default LinkButton