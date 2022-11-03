import { useContext } from 'react'
import { Toggle } from 'react-daisyui'
import { AppContext } from '../../state/context'

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(AppContext)
  const isDark = theme === 'dark'

  return (
    <div className="flex justify-center items-center space-x-2 mx-4">
      <Toggle color="secondary" onChange={toggleTheme} checked={!isDark} />
      <span data-testid="toggle-label">{isDark ? 'Dark' : 'Light'}</span>
    </div>
  )
}

export default ToggleTheme
