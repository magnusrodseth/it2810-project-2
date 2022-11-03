import { getEncodedProjectId } from '../../api/auth'
import { getCommits, getContributorsFromCommits } from '../../api/commits'
import { SessionStorage } from '../../lib/storage'
import { Option } from '../../types/charts'

/**
 * Maps out all contributors based on commits
 *
 * @returns an array of contributors
 */
const useGetContributorsAsOptionsQuery = async () => {
  const repoUrl = SessionStorage.get('repoUrl') || ''

  const options: Option[] = await getCommits({ id: getEncodedProjectId(repoUrl) })
    .then((commits) => getContributorsFromCommits(commits))
    .catch((error) => error)

  return options
}

export default useGetContributorsAsOptionsQuery
