import { LineChartData, YAxisLabel } from '../../types/charts'

/*
 * Calculates the domain of the y-axis based on the data and the key.
 *
 * This is used to zoom in and out on the line chart.
 *
 * @param data - is the data to calculate the domain from
 * @param key - is the key prop to use when calculating the domain
 * @param offset - if the offset of the bottom and top of the domain
 **/
const getYAxisDomain = (data: LineChartData, key: YAxisLabel, offset: number) => {
  const copy = [...data]
  let [bottom, top] = [copy[0][key], copy[0][key]]

  copy.forEach((item) => {
    if (item[key] > top) {
      top = item[key]
    }
    if (item[key] < bottom) {
      bottom = item[key]
    }
  })

  return [(bottom | 0) - offset, (top | 0) + offset]
}

export default getYAxisDomain
