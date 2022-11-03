import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { isAuthenticated } from '../../api/auth'
import { AuthenticationResponse } from '../../types/api'

/**
 * Checks if the user is authenticated.
 **/
const useIsAuthenticatedQuery = (url: string) => {
  const { data, isLoading, error, refetch } = useQuery<AuthenticationResponse, AxiosError>(
    ['authenticated'],
    async () =>
      await isAuthenticated(url)
        .then((response) => response)
        .catch((error) => error)
  )

  return { data, isLoading, error, refetch }
}

export default useIsAuthenticatedQuery
