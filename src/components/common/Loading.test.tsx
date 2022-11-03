import renderer from 'react-test-renderer'
import Loading from './Loading'

describe('Loading', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Loading />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
