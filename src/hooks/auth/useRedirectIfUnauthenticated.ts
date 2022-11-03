import { useEffect } from 'react'
import { isAuthenticated } from '../../api/auth'
import { SessionStorage } from '../../lib/storage'
import useRedirect from '../common/useRedirect'

/**
 * Redirects a user if the user is not authenticated.
 *
 * Checks if the repository URL and access token are set, validates the credentials against the API and
 * redirects if not authenticated.
 */
const useRedirectIfUnauthenticated = () => {
  const repoUrl = SessionStorage.get('repoUrl')
  const accessToken = SessionStorage.get('accessToken')

  const signOutAndRedirect = () => {
    SessionStorage.clear()
    useRedirect('/login')
  }

  useEffect(() => {
    if (!repoUrl || !accessToken) {
      signOutAndRedirect()
      return
    }

    // Helper to asynchronously check validity of the repo URL and access token
    const authenticated = async () => await isAuthenticated(repoUrl, accessToken)

    authenticated().catch(() => signOutAndRedirect())
  }, [])
}

export default useRedirectIfUnauthenticated
