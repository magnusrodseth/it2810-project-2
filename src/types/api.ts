export type ApiCommitsOptions = {
  id: string
  withStats?: boolean
  perPage?: number
}

export type ApiIssuesOptions = {
  id: string
}

export type AuthenticationResponse = {
  ok: boolean
  message: string
}

export type CommitStats = {
  additions: number
  deletions: number
  total: number
}

export type Commit = {
  id: string
  short_id: string
  title: string
  author_name: string
  author_email: string
  authored_date: string
  committer_name: string
  committer_email: string
  committed_date: string
  created_at: string
  message: string
  parent_ids: string[]
  web_url: string
  stats?: CommitStats
}

export type Issue = {
  id: number
  issue_type: 'issue' | 'incident' | 'test_case'
  labels: string[]
  state: 'all' | 'opened' | 'closed'
}
