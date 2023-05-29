import { UsernameContext } from '@/features/authentication/username'
import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [username, setUsername] = useState<string | null>('')
  const queryClient = new QueryClient()

  useEffect(() => {
    const usernameInLocalStorage = localStorage.getItem('username')
    setUsername(usernameInLocalStorage)
  }, [])

  useEffect(() => {
    if (!username) {
      return
    }
    localStorage.setItem('username', username)
  }, [username])

  return (
    <QueryClientProvider client={queryClient}>
      <UsernameContext.Provider value={{ username, setUsername }}>
        <Component {...pageProps} />
      </UsernameContext.Provider>
    </QueryClientProvider>
  )
}
