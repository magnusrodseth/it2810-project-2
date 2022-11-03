import moment from 'moment'
import { NameType, Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { LineChartEntry } from '../../../types/charts'

type LineChartTooltipProps = {
  active?: boolean
  payload?: Payload<ValueType, NameType>[]
}

const LineChartTooltip: React.FC<LineChartTooltipProps> = ({ active, payload }) => {
  if (!(active && payload && payload.length === 1)) {
    return null
  }
  const { commits, timestamp, stats } = payload[0].payload as LineChartEntry

  return (
    <div className={'custom-tooltip'}>
      <h1 className="font-bold">{moment.unix(timestamp).format('DD.MM.YYYY')}</h1>

      <div className="flex flex-col space-y-2">
        <span>Commits: {commits}</span>

        {stats && commits !== 0 && (
          <>
            <span className="text-green-700">Additions: {stats.additions}</span>
            <span className="text-red-700">Deletions: {stats.deletions}</span>
            <div className="h-[1px] bg-base-300" />
            <span className="font-bold">Total: {stats.total}</span>
          </>
        )}
      </div>
    </div>
  )
}

export default LineChartTooltip
