import { useEffect, useState } from 'react'
import { Dimensions } from '../../types/dimensions'

const getWindowDimensions = (): Dimensions => {
  const { innerWidth: width, innerHeight: height } = window

  return {
    width,
    height
  }
}

/**
 * Calculates the dimensions of the window.
 *
 * Inspiration: https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
 **/
const useWindowDimensions = (): Dimensions => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

export default useWindowDimensions
