import React from 'react'
import type { AnyColor, PlayableColor } from './gameCalculations'
import toSwatches from './Swatches'

export type PegHandler = ({color, index}:{color: PlayableColor, index: number}) => void;

export type PegsPropsType = {
  pegs: AnyColor[],
  onClick?: PegHandler
}
const Pegs = ({pegs, onClick}: PegsPropsType) => (
  <ul className="pegs">
    {pegs.map(toSwatches(onClick))}
  </ul>
)

export default Pegs;
