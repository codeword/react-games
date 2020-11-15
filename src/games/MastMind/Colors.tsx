import React from 'react'
import Swatch from './Swatch'
import LinkButton from './LinkButton'
import type { AnyColor, PlayableColor } from './gameCalculations'

type ButtonEventType = React.MouseEvent<HTMLButtonElement, MouseEvent>


type ColorHandler = (color: PlayableColor, index: number) => void;

type CaptureType = ( handler: ColorHandler, color: PlayableColor, index: number
) => (event: ButtonEventType) => void
const capture:CaptureType = (handler, color, index) => {
  return (e) => {
    e.preventDefault();
    handler(color, index);
  }
}

export type ColorsPropsType = {
  colors: AnyColor[],
  onClick?: (color: PlayableColor, index:number) => void
}
const Colors = ({colors, onClick}: ColorsPropsType) => {
  let items = colors.map((color, index) => {
    let swatch = <Swatch {...{color}}/>;
    if(onClick) {
      swatch = <LinkButton {...{onClick:capture(onClick, color as PlayableColor, index)}}>{swatch}</LinkButton>;
    }
    return <li key={index}>{swatch}</li>;
  });
  return <ul className="colors">{items}</ul>;
}

export default Colors;