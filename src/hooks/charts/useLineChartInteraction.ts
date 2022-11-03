import { useState } from 'react'
import { LineChartData, Position } from '../../types/charts'
import useReset from './useReset'
import useZoom from './useZoom'

const initialPosition: Position = {
  left: 'dataMin',
  right: 'dataMax',
  top: 'dataMax+1',
  bottom: '0'
}

const initialPositionReferences: Position = {
  left: '',
  right: '',
  top: 'dataMax+20',
  bottom: '0'
}

/**
 * Wrapper hook for all interaction with the line chart.
 *
 * This hook handles the positions, the position references when zooming,
 * the zooming itself, and resetting the chart.
 **/
const useLineChartInteraction = (data?: LineChartData) => {
  const [position, setPosition] = useState(initialPosition)
  const [positionReferences, setPositionReferences] = useState(initialPositionReferences)

  const zoom = useZoom([position, setPosition], [positionReferences, setPositionReferences], data)

  const reset = useReset(
    [position, setPosition],
    [positionReferences, setPositionReferences]
  )

  return {
    position,
    setPosition,
    positionReferences,
    setPositionReferences,
    zoom,
    reset
  }
}

export default useLineChartInteraction
