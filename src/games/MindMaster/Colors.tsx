import React from 'react'
import Swatch from './Swatch'
import LinkButton from './LinkButton'
import type { AnyColor, PlayableColor } from './gameCalculations'
import toSwatches from './Swatches'

type ColorHandler = ({color, index}:{color: PlayableColor, index: number}) => void;

export type ColorsPropsType = {
  colors: AnyColor[],
  onClick?: ColorHandler
}
const Colors = ({colors, onClick}: ColorsPropsType) => (
  <ul className="colors">
    {colors.map(toSwatches(onClick))}
  </ul>
)

export const Palette = ({colors, onClick}: ColorsPropsType) => (
  <ul className="palette">
    {colors.map(toSwatches(onClick))}
  </ul>
)

export default Colors;
