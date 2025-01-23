/*eslint-disable consistent-return*/
import { useEffect, useState } from 'react'

const useDebounceValue = <T>(value: T, delay: number, options?: { immediate: boolean }): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    if (options?.immediate) {
      setDebouncedValue(value)
      return
    }

    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay, options?.immediate])

  return debouncedValue
}

export { useDebounceValue }
