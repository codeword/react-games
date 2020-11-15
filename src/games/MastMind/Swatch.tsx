import React from 'react'
import classNames from 'classnames'
import { AnyColor } from './gameCalculations'

export type SwatchProps = {
  color: AnyColor,
  className?: string
}

const Swatch = ({color, className}: SwatchProps) => {
  let colorClasses = classNames('color', {[color]: !className}, className)
  return (
    <div className="swatch">
      <div className={colorClasses}/>
    </div>
  )
}

export default Swatch;