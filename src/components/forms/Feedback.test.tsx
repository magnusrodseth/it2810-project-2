import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { Severity } from '../../types/forms'
import Feedback from './Feedback'

const assertCorrectStyle = (severity: Severity, className: string) => {
  render(<Feedback feedback={'feedback'} severity={severity} />)
  const component = screen.getByTestId('feedback')
  expect(component).toHaveClass(className)
}

describe('Feedback', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Feedback feedback={'feedback'} severity={'success'} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders error style with "error" severity', () => {
    assertCorrectStyle('error', 'border-error')
  })

  it('renders warning style with "warning" severity', () => {
    assertCorrectStyle('warning', 'border-warning')
  })

  it('renders info style with "info" severity', () => {
    assertCorrectStyle('info', 'border-info')
  })

  it('renders success style with "success" severity', () => {
    assertCorrectStyle('success', 'border-success')
  })
})

export {}
