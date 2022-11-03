import Select from './Select'
import renderer from 'react-test-renderer'
import { Option } from '../../types/charts'

describe('Select', () => {
  it('renders correctly', () => {
    const options: Option[] = [
      {
        label: 'label',
        value: 'value'
      }
    ]

    const component = renderer.create(
      <Select label="Test" options={options} onChange={() => { }} selected={undefined} />
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
