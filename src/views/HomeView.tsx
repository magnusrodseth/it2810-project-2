import { useRedirectIfAuthenticated } from '../hooks/auth/useRedirectIfAuthenticated'

const HomeView = () => {
  useRedirectIfAuthenticated()
  return null
}

export default HomeView
