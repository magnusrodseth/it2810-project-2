import { Dimensions } from '../../types/dimensions'
import { breakpoints } from '../../utils/common/breakpoints'
import useWindowDimensions from '../common/useWindowDimensions'

/**
 * Calculates the dimensions of the graph based on the window dimensions.
 *
 * @returns {Dimensions} The dimensions of the graph.
 **/
const useChartDimensions = (): Dimensions => {
  const { width, height } = useWindowDimensions()

  if (width <= breakpoints.small) {
    return { width: width * 0.75, height: width * 0.75 }
  }

  if (width <= breakpoints.medium) {
    return { width: width * 0.8, height: height * 0.6 }
  }

  if (width <= breakpoints.large) {
    return { width: width * 0.7, height: height * 0.6 }
  }

  return { width: width * 0.6, height: height * 0.6 }
}

export default useChartDimensions
