import { SessionStorage } from '../../lib/storage'

const isLoggedIn = () =>
  SessionStorage.get('repoUrl') !== undefined && SessionStorage.get('accessToken') !== undefined

export default isLoggedIn
