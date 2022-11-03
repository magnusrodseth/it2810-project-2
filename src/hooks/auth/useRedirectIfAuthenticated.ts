import { useEffect } from 'react'
import { isAuthenticated } from '../../api/auth'
import isIndexHashedRoute from '../../utils/routes/isIndexHashedRoute'
import useRedirect from '../common/useRedirect'

/**
 * Redirects the user to the dashboard if they are authenticated, or to the login page if not.
 */
export const useRedirectIfAuthenticated = () => {
  useEffect(() => {
    //prettier-ignore
    (async () => {
      await isAuthenticated().then(({ ok }) => {
        const hashedRoute = window.location.hash
        const currentRoute = hashedRoute[0] === '#'
          ? hashedRoute.slice(1)
          : hashedRoute

        if (!ok && isIndexHashedRoute(currentRoute)) {
          useRedirect('/login')
        }

        if (ok) {
          useRedirect('/dashboard')
        }
      })
    })()
  }, [])
}

export {}
