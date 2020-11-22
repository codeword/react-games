import React from 'react'
import classNames from 'classnames'
import { AnyColor } from './gameCalculations'

const Peg = ({color}: {color: AnyColor}) => (
  <div className="peg">
    <div className={classNames('color', color)}/>
  </div>
)

export default Peg;