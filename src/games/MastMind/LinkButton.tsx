import React from 'react'
import classNames from 'classnames/dedupe'

export type LinkButtonProps = React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>;

const LinkButton: LinkButtonProps = ({className, ...props}) => {
  return (
    <button {...{
      className: classNames(className, 'link-button'), 
      ...props
    }} />
  );
};

export default LinkButton