import { useState } from 'react'
import Button from '../common/Button'
import ToggleTheme from '../common/ToggleTheme'
import isLoggedIn from '../../utils/validators/isLoggedIn'
import useRedirect from '../../hooks/common/useRedirect'
import { SessionStorage } from '../../lib/storage'

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())

  const handleRedirect = () => {
    if (loggedIn) {
      setLoggedIn(!loggedIn)
      SessionStorage.clear()
      useRedirect('/dashboard')
      return
    }

    useRedirect('/login')
  }

  return (
    <div className="w-full z-10 flex items-center justify-between px-3 py-2 shadow-md fixed bg-neutral">
      <div className="font-bold tracking-wide text-xs md:text-lg">GitLab Visualizer</div>
      <div className="flex justify-center items-center">
        <ToggleTheme />
        <Button onClick={handleRedirect} color="primary" className="mr-2">
          {loggedIn ? 'Sign out' : 'Sign in'}
        </Button>
      </div>
    </div>
  )
}

export default Navbar
