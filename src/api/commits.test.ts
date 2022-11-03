import moment from 'moment'
import { Commit } from '../types/api'
import { getTimestampsFromFirstCommitToDate } from './commits'

describe('commits', () => {
  it('gets the correct dates from the first commit to today', () => {
    const tenDays = 10
    const firstCommitDate = '2020-01-01T00:00:00.000Z'
    const tenDaysLater = moment(firstCommitDate).add(tenDays, 'days')

    const mockCommit: Commit = {
      id: '1',
      title: 'First commit',
      authored_date: firstCommitDate,
      message: 'First commit',
      author_name: 'John Doe',
      author_email: 'john.doe@example.com',
      web_url: 'https://example.com/first-commit',
      short_id: '1',
      created_at: firstCommitDate,
      parent_ids: ['0'],
      committed_date: firstCommitDate,
      committer_name: 'John Doe',
      committer_email: 'john.doe@example.com'
    }

    const commits: Commit[] = [mockCommit]

    const timestamps = getTimestampsFromFirstCommitToDate(commits, moment(tenDaysLater).unix())

    expect(timestamps.length).toBe(tenDays)

    for (let i = 1; i < timestamps.length; i++) {
      const currentIsAfterPrevious = moment
        .unix(timestamps[i])
        .isAfter(moment.unix(timestamps[i - 1]))

      expect(currentIsAfterPrevious).toBe(true)
    }
  })
})

export {}
