import { VALID_PROJECT_URL } from '../constants/api'
import { getEncodedProjectId } from './auth'

describe('Authentication', () => {
  it('converts repository URL to encoded project ID', () => {
    const REPO_URL = `${VALID_PROJECT_URL}1/project-2`
    const expected = 'it2810-h22%2FTeam-1%2Fproject-2'

    const actual = getEncodedProjectId(REPO_URL)

    expect(actual).toBe(expected)
  })
})

export {}
