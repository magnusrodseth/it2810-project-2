import { useEffect } from 'react'
import { SessionStorage } from '../../lib/storage'
import useRedirect from '../common/useRedirect'

/**
 * Sets credentials in session storage if the form input is valid and the user should log in.
 * @param isValid - is a boolean determining whether the form input is valid.
 * @param url - is the repository URL.
 * @param accessToken - is the access token.
 */
const useSetCredentials = (isValid: boolean, url: string, accessToken: string) => {
  useEffect(() => {
    if (isValid) {
      SessionStorage.set('repoUrl', url)
      SessionStorage.set('accessToken', accessToken)
      useRedirect('/dashboard')
    }
  }, [isValid])
}

export default useSetCredentials
