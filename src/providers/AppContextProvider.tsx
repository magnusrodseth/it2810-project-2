import { useState } from 'react'
import useTheme from '../hooks/common/useTheme'
import { AppContext } from '../state/context'
import { Contributor } from '../types/charts'

type AppContextProviderProps = {
  children: React.ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [theme, toggleTheme] = useTheme()
  const [contributor, setContributor] = useState<Contributor | undefined>()
  const [withStats, setWithStats] = useState(false)

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      contributor,
      setContributor,
      withStats,
      setWithStats
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
