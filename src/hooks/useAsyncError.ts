import { useCallback, useState } from 'react'

/**
 * useAsyncError
 * A custom React hook to handle asynchronous errors by throwing them.
 *
 * @returns A function to throw an asynchronous error.
 */

const useAsyncError = () => {
  const [, setError] = useState<undefined | (() => void)>()
  return useCallback(
    (error: Error) => {
      setError(() => {
        throw error
      })
    },
    [setError]
  )
}

export { useAsyncError }
