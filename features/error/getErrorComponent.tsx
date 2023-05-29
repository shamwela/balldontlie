import { Error as ErrorComponent } from './Error'

export const getErrorComponent = (error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error'
  return <ErrorComponent message={errorMessage} />
}
