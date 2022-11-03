import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { getEncodedProjectId } from '../../api/auth'
import { getChartDataFromIssues, getIssues } from '../../api/issues'
import { SessionStorage } from '../../lib/storage'
import { BarChartData } from '../../types/charts'

/**
 * Gets all issues from the GitLab API.
 **/
const useGetIssuesQuery = () => {
  const repoUrl = SessionStorage.get('repoUrl') || ''

  const { data, isLoading, error } = useQuery<BarChartData, AxiosError>(
    ['issues'],
    async () =>
      await getIssues({ id: getEncodedProjectId(repoUrl) })
        .then((issues) => getChartDataFromIssues(issues))
        .catch((error) => error)
  )

  return { data, isLoading, error }
}

export default useGetIssuesQuery
