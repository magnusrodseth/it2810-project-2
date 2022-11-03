import renderer from 'react-test-renderer'
import ToggleTheme from './ToggleTheme'
import { render, screen } from '@testing-library/react'

describe('ToggleTheme', () => {
  it('renders correctly', () => {
    const component = renderer.create(<ToggleTheme />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders the correct initial theme', () => {
    render(<ToggleTheme />)
    const toggle = screen.getByRole('checkbox')
    expect(toggle).not.toBeChecked()
  })
})

export { }
