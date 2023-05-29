import { createContext, useContext, useState } from 'react'

type UsernameContextType = {
  username: string | null
  setUsername: (username: string) => void
}

export const UsernameContext = createContext<UsernameContextType>({
  username: '',
  setUsername: () => {},
})

export const useUsername = () => useContext(UsernameContext)
