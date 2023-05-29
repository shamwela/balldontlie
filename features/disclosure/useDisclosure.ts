import { useState } from 'react'

export const useDisclosure = () => {
  const [isOpened, setOpened] = useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)
  return { isOpened, open, close }
}
