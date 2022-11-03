import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import Layout from '../components/common/Layout'
import AppContextProvider from './AppContextProvider'
import RouterProvider from './RouterProvider'

type AppProviderProps = {
  children?: ReactNode
}

const queryClient = new QueryClient()

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AppContextProvider>
      <Layout>
        <QueryClientProvider client={queryClient}>
          <RouterProvider>
            {children}
          </RouterProvider>
        </QueryClientProvider>
      </Layout>
    </AppContextProvider>
  )
}

export default AppProvider
