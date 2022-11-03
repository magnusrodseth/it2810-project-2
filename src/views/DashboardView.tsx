import { useState } from 'react'
import BarChart from '../components/charts/BarChart/BarChart'
import BarChartInformation from '../components/charts/BarChart/BarChartInformation'
import LineChart from '../components/charts/LineChart/LineChart'
import LineChartInformation from '../components/charts/LineChart/LineChartInformation'
import Button from '../components/common/Button'
import useRedirectIfUnauthenticated from '../hooks/auth/useRedirectIfUnauthenticated'
import { ChartType } from '../types/charts'
import classNames from '../utils/common/classNames'

const DashboardView = () => {
  const [type, setType] = useState<ChartType>('commits')

  const toggleChartType = () => {
    setType((previous) => (previous === 'commits' ? 'issues' : 'commits'))
  }

  // Check if user is authenticated when accessing dashboard
  useRedirectIfUnauthenticated()

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center my-8 w-10/12 md:w-3/4 lg:w-1/2">
        {type === 'commits' ? <LineChartInformation /> : <BarChartInformation />}
      </div>

      <div
        className={classNames(
          'flex flex-col justify-center items-center md:items-end',
          'space-y-4'
        )}>
        <div
          className={classNames(
            'flex flex-col md:flex-row',
            'space-y-4 md:space-x-4 md:space-y-0'
          )}>
          <Button onClick={toggleChartType}>
            Change to {type === 'commits' ? 'issue' : 'commit'} chart
          </Button>
        </div>

        {type == 'commits' ? <LineChart /> : <BarChart />}
      </div>
    </div>
  )
}

export default DashboardView
