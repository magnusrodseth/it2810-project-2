import { Dispatch, SetStateAction } from 'react'
import { LineChartData, Position } from '../../types/charts'
import getYAxisDomain from '../../utils/charts/getYAxisDomain'

/**
 * Zooms the graph to the selected area.
 *
 * Inspiration: https://codesandbox.io/s/l4pq6x00xq
 **/
const useZoom = (
  [position, setPosition]: [Position, Dispatch<SetStateAction<Position>>],
  [positionReferences, setPositionReferences]: [Position, Dispatch<SetStateAction<Position>>],
  data?: LineChartData
) => {
  const zoom = () => {
    let { left: refLeft, right: refRight } = positionReferences

    if (refLeft === refRight || refRight === '') {
      setPositionReferences({
        ...positionReferences,
        left: refLeft,
        right: refRight
      })

      return
    }

    if (refLeft > refRight) {
      // prettier-ignore
      [refLeft, refRight] = [refRight, refLeft]
    }

    if (!data) {
      return
    }

    const [bottom, top] = getYAxisDomain(data, 'commits', 1)
    const [refBottom, refTop] = getYAxisDomain(data, 'commits', 1)

    setPosition({
      ...position,
      left: refLeft,
      right: refRight,
      bottom: bottom.toString(),
      top: top.toString()
    })

    setPositionReferences({
      ...positionReferences,
      left: '',
      right: '',
      bottom: refBottom.toString(),
      top: refTop.toString()
    })
  }

  return zoom
}

export default useZoom
