import axios from 'axios'
import { BASE_API_URL } from '../constants/api'
import { ApiIssuesOptions, Issue } from '../types/api'
import { BarChartData } from '../types/charts'
import { getAccessToken } from '../utils/api/handlers'

/**
 * @param options is the options for the request
 * @returns a promise that resolves to an array of issues
 */
export const getIssues = async ({
  id
}: ApiIssuesOptions): Promise<Issue[]> => {
  const url = `${BASE_API_URL}/${id}/issues`

  const token = getAccessToken()

  const response = await axios
    .get(url, {
      headers: {
        'PRIVATE-TOKEN': token
      }
    })
    .then((response) => response.data as Issue[])
    .catch((error) => {
      throw new Error(error)
    })

  return response
}

/**
 * Maps data from the GitLab API to the format expected by the chart to display issues.
 *
 * @param issues is a list of issues
 * @returns a list containing labels and their count
 */
export const getChartDataFromIssues = (issues: Issue[]): BarChartData => {
  const labels = issues.map((issue) => issue.labels).flatMap((issue) => issue)

  // Sum counts for unique labels into a map with key: label, value: count
  const map = labels.reduce(
    (acc, label) => acc.set(label, (acc.get(label) || 0) + 1),
    new Map<string, number>()
  )

  return Array.from(map, ([label, count]) => ({ label, count }))
}
