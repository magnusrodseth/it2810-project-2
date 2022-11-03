import renderer from 'react-test-renderer'
import Button from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Button onClick={() => {}}>Hello</Button>)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
