import { useEffect, useState } from 'react'
import { LocalStorage } from '../../lib/storage'
import { Theme } from '../../types/theme'

/**
 * Manages the theme state persistently in the local storage.
 **/
const useTheme = () => {
  const [theme, setTheme] = useState<Theme>((LocalStorage.get('theme') || 'dark') as Theme)

  const toggleTheme = () => {
    setTheme((previous) => (previous === 'dark' ? 'light' : 'dark'))
  }

  useEffect(() => {
    LocalStorage.set('theme', theme)
  }, [theme])

  return [theme, toggleTheme] as const
}

export default useTheme
