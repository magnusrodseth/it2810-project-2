import { useContext } from 'react'
import { Bar, BarChart as RechartBarChart, Tooltip, XAxis, YAxis } from 'recharts'
import useChartDimensions from '../../../hooks/charts/useChartDimensions'
import useWindowDimensions from '../../../hooks/common/useWindowDimensions'
import useGetIssuesQuery from '../../../hooks/queries/useGetIssuesQuery'
import { AppContext } from '../../../state/context'
import palette from '../../../styles/palette'
import { breakpoints } from '../../../utils/common/breakpoints'
import CustomError from '../../common/CustomError'
import Loading from '../../common/Loading'
import BarChartTooltip from './BarChartTooltip'

const BarChart: React.FC = () => {
  const { theme } = useContext(AppContext)

  const { data, isLoading, error } = useGetIssuesQuery()
  const { width, height } = useChartDimensions()
  const { width: windowWith } = useWindowDimensions()

  const displayLabels = windowWith > breakpoints.small

  return (
    <div className="rounded-lg border-[1px] border-secondary p-4">
      {isLoading && <Loading />}

      {!error ? (
        <RechartBarChart width={width} height={height} data={data}>
          <YAxis domain={[0, 'dataMax+2']} />
          <Bar label={displayLabels} dataKey="count" fill={palette[theme].secondary} />
          {displayLabels && (
            <XAxis
              height={100}
              dx={-20}
              dataKey={'label'}
              interval={0}
              angle={40}
              textAnchor="start"
            />
          )}
          <Tooltip content={<BarChartTooltip />} cursor={{ fill: 'transparent' }} />
        </RechartBarChart>
      ) : (
        <CustomError />
      )}
    </div>
  )
}

export default BarChart
