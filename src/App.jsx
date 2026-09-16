import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './data/queryClient'
import { LangProvider } from './i18n/LangContext'
import { ToastProvider } from './components/Toast'
import ErrorBoundary from './app/ErrorBoundary'
import RootRouter from './app/RootRouter'

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <LangProvider>
          <ToastProvider>
            <RootRouter />
          </ToastProvider>
        </LangProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
