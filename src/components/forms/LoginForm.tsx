import Button from '../../components/common/Button'
import { useState } from 'react'
import { isAuthenticated } from '../../api/auth'
import useFeedback from '../../hooks/forms/useFeedback'
import { mapStatusToMessage } from '../../utils/api/handlers'
import { AxiosError } from 'axios'
import { AuthenticationResponse } from '../../types/api'
import Feedback from './Feedback'
import classNames from '../../utils/common/classNames'
import InputField from './InputField'
import { useRedirectIfAuthenticated } from '../../hooks/auth/useRedirectIfAuthenticated'
import isValidProjectUrl from '../../utils/validators/isValidProjectUrl'
import useSetCredentials from '../../hooks/forms/useSetCredentials'

const LoginForm = () => {
  const [feedback, severity, setFeedback] = useFeedback()
  const [url, setUrl] = useState('')
  const [accessToken, setAccessToken] = useState('')

  useRedirectIfAuthenticated()

  const handleLogin = async () => {
    if (!isValidProjectUrl(url)) {
      setFeedback('Invalid project URL', 'error')
      return
    }

    await isAuthenticated(url, accessToken)
      .then((response) => {
        setFeedback(response.message, 'success')
      })
      .catch((error: AxiosError<AuthenticationResponse>) => {
        const feedback =
          error.response?.data.message || mapStatusToMessage(error.response?.status || 500)

        setFeedback(feedback, 'error')
      })
  }

  const isValid = severity === 'success'
  useSetCredentials(isValid, url, accessToken)

  return (
    <div>
      {feedback && (
        <div className="my-4 text-center">
          <Feedback feedback={feedback} severity={severity} />
        </div>
      )}

      <form
        className={classNames(
          'flex flex-col justify-center',
          'rounded-lg rise-on-hover bg-base-300 shadow-md hover:shadow-lg',
          'space-y-8 p-6 md:p-10'
        )}
        onSubmit={(event) => {
          event.preventDefault()
          handleLogin()
        }}>
        <InputField
          label="GitLab Repository URL"
          id="input-url"
          placeholder="Type here"
          dataTestId="input-url"
          onChange={(event) => setUrl(event.target.value)}
          required
        />

        <InputField
          label="Personal access token"
          id="input-access-token"
          placeholder="Type here"
          dataTestId="input-access-token"
          onChange={(event) => setAccessToken(event.target.value)}
          required
        />

        <Button color="secondary" type="submit" className="mt-6">
          Sign In
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
