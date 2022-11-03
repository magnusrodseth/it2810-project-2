import { useContext } from 'react'
import {
  Line,
  LineChart as RechartsLineChart,
  ReferenceArea,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import useChartDimensions from '../../../hooks/charts/useChartDimensions'
import Button from '../../common/Button'
import useGetCommitsQuery from '../../../hooks/queries/useGetCommitsQuery'
import Loading from '../../common/Loading'
import CustomError from '../../common/CustomError'
import { AppContext } from '../../../state/context'
import useLineChartInteraction from '../../../hooks/charts/useLineChartInteraction'
import timestampToDDMMYYYY from '../../../utils/common/formatTimestamp'
import { Toggle } from 'react-daisyui'
import LineChartTooltip from './LineChartTooltip'
import useFetchContributorsAsOptions from '../../../hooks/charts/useFetchContributorsAsOptions'
import palette from '../../../styles/palette'
import Select from '../../common/Select'
import classNames from '../../../utils/common/classNames'

const LineChart: React.FC = () => {
  const { withStats, setWithStats, contributor, setContributor, theme } = useContext(AppContext)
  const options = useFetchContributorsAsOptions()

  const { data, isLoading, error, isFetching } = useGetCommitsQuery(withStats, contributor)

  const { position, positionReferences, setPositionReferences, zoom, reset } =
    useLineChartInteraction(data)

  const { width, height } = useChartDimensions()
  const { left, right, top, bottom } = position

  const handleToggleWithStats = async () => {
    setWithStats(!withStats)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {(isLoading || isFetching) && <Loading />}

      {!error && data ? (
        <div className="rounded-lg border-[1px] border-secondary p-4">
          <div className={classNames(
            'flex flex-col md:flex-row justify-center items-center md:justify-end',
            'space-y-4 md:space-y-0 md:space-x-4'
          )}>
            <div className="flex justify-center space-x-2">
              <span>With stats</span>
              <Toggle color="secondary" checked={withStats} onChange={handleToggleWithStats} />
            </div>
            <Select
              label="Select a contributor"
              options={options}
              selected={contributor}
              onChange={(e) => {
                setContributor(e.target.value)
              }}
            />

            <Button onClick={reset} size={'xs'} color="secondary" className="my-1 text-black">
              Reset
            </Button>
          </div>

          <RechartsLineChart
            width={width}
            height={height}
            data={data}
            onMouseDown={(e) => {
              if (e == null) return
              return setPositionReferences({ ...positionReferences, left: e.activeLabel as string })
            }}
            onMouseMove={(e) => {
              if (e == null) return
              positionReferences.left &&
                setPositionReferences({ ...positionReferences, right: e.activeLabel as string })
            }}
            onMouseUp={zoom}>
            <XAxis
              allowDataOverflow={true}
              dataKey="timestamp"
              domain={[left, right]}
              type="number"
              tickFormatter={timestampToDDMMYYYY}
              tickMargin={10}
            />
            <YAxis
              allowDataOverflow={true}
              domain={[Math.max(parseInt(bottom), 0), top]}
              type="number"
              yAxisId="1"
              tickMargin={10}
            />
            <Tooltip labelFormatter={timestampToDDMMYYYY} content={<LineChartTooltip />} />

            <Line
              yAxisId="1"
              type="monotone"
              dataKey="commits"
              stroke={palette[theme].secondary}
              strokeWidth={2.5}
              animationDuration={1500}
            />

            {positionReferences.left && positionReferences.right && (
              <ReferenceArea
                yAxisId="1"
                x1={positionReferences.left}
                x2={positionReferences.right}
                strokeOpacity={0.3}
              />
            )}
          </RechartsLineChart>
        </div>
      ) : (
        <CustomError />
      )}
    </div>
  )
}

export default LineChart
