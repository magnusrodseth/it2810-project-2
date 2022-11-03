import { useState } from 'react'
import { Severity } from '../../types/forms'

/**
 * Wrapper hook for providing feedback to the user with a given severity.
 *
 * Feedback is displayed as a result of submitting something, e.g. a form.
 * This feedback has a related severity, e.g. success, error, warning, etc.
 **/
const useFeedback = () => {
  const [feedback, _setFeedback] = useState<string | undefined>(undefined)
  const [severity, _setSeverity] = useState<Severity>('info')

  const setFeedback = (feedback: string, severity: Severity) => {
    _setFeedback(feedback)
    _setSeverity(severity)
  }

  return [feedback, severity, setFeedback] as const
}

export default useFeedback
