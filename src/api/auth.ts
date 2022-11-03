import axios from 'axios'
import { BASE_API_URL, BASE_URL } from '../constants/api'
import { SessionStorage } from '../lib/storage'
import { AuthenticationResponse } from '../types/api'
import { getAccessToken, mapStatusToMessage } from '../utils/api/handlers'
import isValidProjectUrl from '../utils/validators/isValidProjectUrl'

/**
 * Parses the URL and returns the encoded project ID to be used in the API call.
 *
 * @param url is the repository URL provided by the user
 * @returns an encoded project ID that can be used for API calls
 */
export const getEncodedProjectId = (url: string) => {
  const projectId = url.split(`${BASE_URL}/`)[1]
  return projectId.replaceAll('/', '%2F')
}

/**
 * Validates that the user is authenticated with the provided url.
 *
 * @param url - is the GitLab Repo URL
 * @returns a promise that resolves to a boolean status, and an optional message
 */
export const isAuthenticated = async (
  url?: string,
  accessToken?: string
): Promise<AuthenticationResponse> => {
  const repoUrl = SessionStorage.get('repoUrl') ?? url ?? ''

  if (!isValidProjectUrl(repoUrl)) {
    return { ok: false, message: 'Invalid project URL' }
  }

  const encodedProjectId = getEncodedProjectId(repoUrl)
  const fullPath = `${BASE_API_URL}/${encodedProjectId}`
  const token = accessToken ?? getAccessToken()

  const request = await axios.get(fullPath, {
    headers: {
      'PRIVATE-TOKEN': token
    }
  })

  const ok = request.status === 200

  return {
    ok,
    message: mapStatusToMessage(request.status)
  }
}
