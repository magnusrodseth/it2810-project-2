import { ReactNode, useContext } from 'react'
import { AppContext } from '../../state/context'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'

type LayoutProps = {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useContext(AppContext)
  const dataTheme = theme === 'dark' ? 'night' : 'pastel'

  return (
    <div data-theme={dataTheme} className={theme}>
      <main className="h-full">
        <Navbar />
        <div className="flex h-full min-h-screen justify-center items-center pt-16">{children}</div>
      </main>

      <Footer />
    </div>
  )
}

export default Layout
