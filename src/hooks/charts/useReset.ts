import { Dispatch, SetStateAction, useContext } from 'react'
import { AppContext } from '../../state/context'
import { Position } from '../../types/charts'

/**
 * Resets the graph to its default position.
 **/
const useReset = (
  [position, setPosition]: [Position, Dispatch<SetStateAction<Position>>],
  [positionReferences, setPositionReferences]: [Position, Dispatch<SetStateAction<Position>>]
) => {
  const { setContributor, setWithStats } = useContext(AppContext)

  const reset = () => {
    setPosition({
      ...position,
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+1',
      bottom: 'dataMin'
    })

    setPositionReferences({
      ...positionReferences,
      left: '',
      right: '',
      top: 'dataMax+50'
    })

    // Resets to default state
    setContributor(undefined)
    setWithStats(false)
  }

  return reset
}

export default useReset
