import { NameType, Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { BarChartEntry } from '../../../types/charts'

type BarChartTooltipProps = {
  active?: boolean
  payload?: Payload<ValueType, NameType>[]
}

const BarChartTooltip: React.FC<BarChartTooltipProps> = ({ active, payload }) => {
  if (!(active && payload && payload.length === 1)) {
    return null
  }

  const { label, count } = payload[0].payload as BarChartEntry

  return (
    <div className={'custom-tooltip'}>
      <span><span className="font-bold">{label}</span> - {count}</span>
    </div>
  )
}

export default BarChartTooltip
