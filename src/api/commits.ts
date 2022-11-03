import axios from 'axios'
import moment from 'moment'
import { BASE_API_URL, MAX_PER_PAGE } from '../constants/api'
import { ApiCommitsOptions, Commit, CommitStats } from '../types/api'
import { Contributor, LineChartData } from '../types/charts'
import { getAccessToken } from '../utils/api/handlers'
import { Option } from '../types/charts'

/**
 * Gets a list of commits from the GitLab API.
 *
 * If no access token is provided, an attempt will be made to read the `.env` file
 * for `REACT_APP_PERSONAL_ACCESS_TOKEN`.
 *
 * @param {ApiCommitsOptions} options - is the options for the request
 **/
export const getCommits = async ({
  id,
  withStats,
  perPage = MAX_PER_PAGE
}: ApiCommitsOptions): Promise<Commit[]> => {
  const url = `${BASE_API_URL}/${id}/repository/commits`

  const token = getAccessToken()

  const response = await axios
    .get(url, {
      params: {
        with_stats: withStats,
        per_page: perPage
      },
      headers: {
        'PRIVATE-TOKEN': token
      }
    })
    .then((response) => response.data as Commit[])
    .catch((error) => {
      throw new Error(error)
    })

  return response
}

/**
 * @param commits is an array of commits
 * @returns an array of users as options
 */
export const getContributorsFromCommits = (commits: Commit[]) => {
  const contributors: Option[] = []

  for (const commit of commits) {
    const contributorIsInList = contributors.some(
      (contributor) => contributor.label == commit.author_name
    )

    if (!contributorIsInList) {
      contributors.push({ label: commit.author_name, value: commit.author_name })
    }
  }

  return contributors
}

/**
 * Maps commit data based on the contributor who committed it
 *
 * @param commits is an array of commits
 * @returns an array of commits where the key is the author_name
 */
const mapContributorToCommits = (commits: Commit[]) => {
  const contributorToCommits: Record<string, Commit[]> = {}

  commits.forEach((commit) => {
    const contributor = commit.author_name

    if (contributor in contributorToCommits) {
      contributorToCommits[contributor].push(commit)
    } else {
      contributorToCommits[contributor] = [commit]
    }
  })

  return contributorToCommits
}

/**
 * Maps a date to a list of commits that occurred on that date.
 *
 * @param commits - is the list of commits
 * @returns a record with the date as key and the number of commits as value
 */
const mapDateToCommits = (commits: Commit[]) => {
  const dateToCommits: Record<string, Commit[]> = {}

  commits.forEach((commit) => {
    const date = moment(commit.committed_date).format('DD-MM-YYYY')

    if (date in dateToCommits) {
      dateToCommits[date].push(commit)
    } else {
      dateToCommits[date] = [commit]
    }
  })

  return dateToCommits
}

/**
 * Gets a list of dates from the first commit to today.
 *
 * @param commits - is the list of commits
 * @returns a list of sorted timestamps from the first commit to today
 **/
export const getTimestampsFromFirstCommitToDate = (commits: Commit[], toTimestamp: number) => {
  const sortedCommits = commits.sort(
    (a, b) => moment(a.committed_date).unix() - moment(b.committed_date).unix()
  )

  const firstCommitDate = moment(sortedCommits[0].committed_date)

  const dateTimestamps: number[] = []

  while (firstCommitDate.isBefore(moment.unix(toTimestamp))) {
    dateTimestamps.push(firstCommitDate.unix())
    firstCommitDate.add(1, 'days')
  }

  return dateTimestamps
}

export const getTimestampsFromFirstCommitToToday = (commits: Commit[]) => {
  return getTimestampsFromFirstCommitToDate(commits, moment().unix())
}

/**
 * @param commits is an array of commits
 * @param contributor is the name of the commit author
 * @returns a list of objects, where each object contains the date, number of commits and the author email.
 */
export const getChartDataFromContributor = (commits: Commit[], contributor: Contributor) => {
  const usersWithCommits = mapContributorToCommits(commits)
  return getChartDataFromCommits(usersWithCommits[contributor], contributor)
}

export const mapDateToStats = (commits: Commit[]) => {
  const dateToStats: Record<string, CommitStats> = {}

  for (const commit of commits) {
    if (!commit.stats) {
      continue
    }

    const date = moment(commit.committed_date).format('DD-MM-YYYY')

    if (date in dateToStats) {
      dateToStats[date].additions += commit.stats.additions
      dateToStats[date].deletions += commit.stats.deletions
      dateToStats[date].total += commit.stats.total
    } else {
      dateToStats[date] = {
        additions: commit.stats.additions,
        deletions: commit.stats.deletions,
        total: commit.stats.total
      }
    }
  }

  return dateToStats
}

/**
 * Maps data from the GitLab API to the format expected by the chart to display commits.
 *
 * @param commits - is the list of commits
 * @param author - is the author of the commits
 * @returns a list of objects, where each object contains the date, number of commits and the author email.
 */
export const getChartDataFromCommits = (commits: Commit[], author?: string) => {
  const result: LineChartData = []

  const commitTimestamps = getTimestampsFromFirstCommitToToday(commits)
  const dateToCommits = mapDateToCommits(commits)
  const dateToStats = mapDateToStats(commits)

  commitTimestamps.forEach((timestamp) => {
    const formattedDate = moment.unix(timestamp).format('DD-MM-YYYY')
    const numberOfCommits = dateToCommits[formattedDate]?.length || 0
    const stats = dateToStats[formattedDate]

    result.push({
      timestamp,
      commits: numberOfCommits,
      author,
      stats
    })
  })

  return result
}
