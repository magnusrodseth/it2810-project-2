import { CommitStats } from './api'

export type LineChartEntry = {
  timestamp: number
  commits: number
  author?: string
  stats?: CommitStats
}

export type BarChartEntry = {
  label: string
  count: number
}

export type LineChartData = LineChartEntry[]
export type BarChartData = BarChartEntry[]

export type YAxisLabel = keyof Pick<LineChartEntry, 'commits'>

export type Position = {
  left: string
  right: string
  top: string
  bottom: string
}

export type ChartType = 'commits' | 'issues'

export type Contributor = string

export type Option = {
  label: string
  value: string
}
