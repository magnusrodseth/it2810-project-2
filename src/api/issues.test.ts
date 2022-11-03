import { Issue } from '../types/api'
import { getChartDataFromIssues } from './issues'

describe('issues', () => {
  it('parses the issues correctly and returns the correct format', () => {
    const issues: Issue[] = [
      {
        id: 0,
        issue_type: 'issue',
        state: 'opened',
        labels: ['effort:medium', 'in-progress', 'scope:frontend', 'type:test']
      },
      {
        id: 1,
        issue_type: 'issue',
        state: 'opened',
        labels: ['backlog', 'effort:low', 'priority:medium', 'scope:frontend']
      }
    ]

    const parsedIssues = getChartDataFromIssues(issues)

    // There are seven unique labels, where 'scope:frontend' is a duplicate
    expect(parsedIssues.length).toBe(7)

    expect(parsedIssues).toStrictEqual([
      { label: 'effort:medium', count: 1 },
      { label: 'in-progress', count: 1 },
      { label: 'scope:frontend', count: 2 },
      { label: 'type:test', count: 1 },
      { label: 'backlog', count: 1 },
      { label: 'effort:low', count: 1 },
      { label: 'priority:medium', count: 1 }
    ])
  })
})

export {}
