import React from 'react'
import classNames from 'classnames'
import { AnyColor } from './gameCalculations'

const Swatch = ({color}: {color: AnyColor}) => (
  <div className="swatch">
    <div className={classNames('color', color)}/>
  </div>
)

export default Swatch;