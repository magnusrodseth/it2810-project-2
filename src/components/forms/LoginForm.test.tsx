import renderer, { act } from 'react-test-renderer'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginForm from './LoginForm'

describe('LoginForm', () => {
  beforeAll(() => {
    window.location.hash = '#/login'
  })

  it('renders correctly', () => {
    const component = renderer.create(<LoginForm />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('requires input data', () => {
    render(<LoginForm />)
    const urlInput = screen.getByTestId('input-url')
    const accessTokenInput = screen.getByTestId('input-access-token')

    expect(urlInput).toBeRequired()
    expect(accessTokenInput).toBeRequired()

    // Enter invalid input and expect feedback
    act(() => {
      fireEvent.change(urlInput, { target: { value: 'invalid input' } })
      fireEvent.change(urlInput, { target: { value: 'invalid input' } })

      fireEvent.click(screen.getByRole('button'))
      waitFor(() => expect(screen.getByTestId('feedback')).toBeInTheDocument())
    })
  })
})

export { }
