import { SessionStorage } from '../../lib/storage'

/**
 * Maps a status code to a message.
 *
 * @param status is the HTTP status code returned from an API call
 * @returns a custom string error message based on the error code
 */
export const mapStatusToMessage = (status: number): string => {
  switch (status) {
    case 404:
      return 'Repository not found'
    case 401:
      return 'Invalid personal access token'
    case 500:
      return 'An unexpected error occurred'
    case 200:
      return 'Success'
    default:
      return ''
  }
}

/**
 * Gets the access token to be used for API calls to GitLab.
 *
 * If no access token is provided, an attempt will be made to read the `.env` file
 * for `REACT_APP_PERSONAL_ACCESS_TOKEN`.
 *
 * Else, an empty string is returned, and the API call will fail.
 *
 * @returns the access token, or an empty string if no access token is available.
 **/
export const getAccessToken = () => {
  const localToken = process.env.REACT_APP_PERSONAL_ACCESS_TOKEN ?? ''
  const accessToken = SessionStorage.get('accessToken')

  return accessToken ?? localToken
}
