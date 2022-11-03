import { useEffect, useState } from 'react'
import { Option } from '../../types/charts'
import useGetContributorsAsOptionsQuery from '../queries/useGetContributorsQuery'

/**
 * Fetches contributors as options on initial render.
 **/
const useFetchContributorsAsOptions = () => {
  const [options, setOptions] = useState<Option[]>([])

  useEffect(() => {
    (async () => {
      setOptions(await useGetContributorsAsOptionsQuery())
    })()
  }, [])

  return options
}

export default useFetchContributorsAsOptions
