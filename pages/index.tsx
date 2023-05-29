import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { usePlayers } from '@/features/player/usePlayers'
import { useInView } from 'react-intersection-observer'
import { getErrorComponent } from '@/features/error/getErrorComponent'
import Link from 'next/link'

const HomePage = () => {
  const [username, setUsername] = useState<string | null>(null)
  const {
    data,
    isError,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePlayers()
  const router = useRouter()
  const { ref, inView } = useInView()

  useEffect(() => {
    const usernameInLocalStorage = localStorage.getItem('username')
    setUsername(usernameInLocalStorage)
    // If not logged in, redirect to the login page.
    if (!usernameInLocalStorage) {
      router.push('/login')
    }
  }, [router, username])

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  const logout = () => {
    localStorage.removeItem('username')
    router.push('/login')
  }

  if (isError) {
    return getErrorComponent(error)
  }

  if (isLoading) {
    return <div>Loading players...</div>
  }

  if (!data) {
    return <div>No player data found.</div>
  }
  const { pages } = data

  return (
    <>
      <Head>
        <title>Players page</title>
        <meta name='description' content='Players page' />
      </Head>
      <main className='p-4'>
        <div className='flex gap-x-4 items-center py-4'>
          <span>Your username is {username}.</span>
          <button onClick={logout}>Logout</button>
        </div>

        <div className='flex flex-col gap-y-4'>
          <Link href='/team'>
            Go to the team page
          </Link>
          <h1>Players</h1>
          <p>Infinite scroll with intersection observer.</p>
          <ol>
            {pages.map((page) => {
              return page.data.map((player) => (
                <li key={player.id} className='h-40 border border-black'>
                  {player.first_name}
                </li>
              ))
            })}
          </ol>
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={
              // If it is the last page or fetching the next page.
              !hasNextPage || isFetchingNextPage
            }
          >
            {isFetchingNextPage
              ? 'Loading more...'
              : hasNextPage
              ? 'Load Newer'
              : 'Nothing more to load'}
          </button>
        </div>
      </main>
    </>
  )
}

export default HomePage
