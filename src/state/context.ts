import { createContext } from 'react'
import { Contributor } from '../types/charts'
import { Theme } from '../types/theme'

type AppContextProps = {
  theme: Theme
  toggleTheme: () => void
  contributor?: Contributor
  setContributor: (contributor?: Contributor) => void
  withStats: boolean
  setWithStats: (withStats: boolean) => void
}

export const defaultAppContext: AppContextProps = {
  theme: 'dark',
  toggleTheme: () => { },
  contributor: undefined,
  setContributor: () => { },
  withStats: false,
  setWithStats: () => { }
}

export const AppContext = createContext<AppContextProps>(defaultAppContext)
