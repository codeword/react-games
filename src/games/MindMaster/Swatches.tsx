import React from 'react'
import { AnyColor, PlayableColor } from "./gameCalculations";
import LinkButton, { ButtonEventType } from "./LinkButton";
import Peg from "./Peg";


type SwatchHandler = (props:{color: PlayableColor, index: number}) => void;

type CaptureType = (
  handler: SwatchHandler, 
  color: PlayableColor, 
  index: number
) => ( event: ButtonEventType ) => void
const capture:CaptureType = (handler, color, index) => {
  return (event) => {
    event.preventDefault();
    handler({color, index});
  }
}
const toSwatches = (onClick?: SwatchHandler): (value: AnyColor, index: number) => JSX.Element => {
  return (color, index) => {
    let swatch = <Peg {...{ color }} />
    if (onClick) {
      swatch = <LinkButton {...{ onClick: capture(onClick, color as PlayableColor, index) }}>{swatch}</LinkButton>
    }
    return <li key={index}>{swatch}</li>
  }
}

export default toSwatches;
