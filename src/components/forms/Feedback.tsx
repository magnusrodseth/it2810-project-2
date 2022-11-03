import { Severity } from '../../types/forms'
import classNames from '../../utils/common/classNames'

type FeedbackProps = {
  feedback: string
  severity: Severity
}

const Feedback: React.FC<FeedbackProps> = ({ feedback, severity }) => {
  return (
    <div
      data-testid="feedback"
      className={
        // Tailwind cannot interpolate the class, so it must be typed out manually
        classNames(
          'border-[1px] rounded-lg px-4 py-2 font-bold tracking-wide my-4',
          severity === 'error' ? 'border-error' : '',
          severity === 'warning' ? 'border-warning' : '',
          severity === 'info' ? 'border-info' : '',
          severity === 'success' ? 'border-success' : ''
        )
      }
    >
      <span>{`${feedback}.`}</span>
    </div>
  )
}

export default Feedback
