import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { getEncodedProjectId } from '../../api/auth'
import { getCommits, getChartDataFromCommits, getChartDataFromContributor } from '../../api/commits'
import { SessionStorage } from '../../lib/storage'
import { LineChartData, Contributor } from '../../types/charts'

/**
 * Gets the commits, either the total commits or the commits of a specific contributor.
 **/
const useGetCommitsQuery = (withStats: boolean, contributor?: Contributor) => {
  const repoUrl = SessionStorage.get('repoUrl') || ''

  const { data, isLoading, error, refetch, isFetching } = useQuery<LineChartData, AxiosError>(
    ['commits'],
    async () =>
      await getCommits({ id: getEncodedProjectId(repoUrl), withStats })
        .then((commits) => {
          const contributorIsDefined = contributor && contributor !== ''

          return contributorIsDefined
            ? getChartDataFromContributor(commits, contributor)
            : getChartDataFromCommits(commits)
        })
        .catch((error) => error)
  )

  // Refetch data when the state updates
  useEffect(() => {
    refetch()
  }, [contributor, withStats])

  return { data, isLoading, error, refetch, isFetching }
}

export default useGetCommitsQuery
