/*eslint-disable consistent-return*/
import { useEffect, useState } from 'react'

/**
 * useDebounceValue
 * A custom React hook for debouncing a value with an optional immediate update.
 *
 * @param value - The input value to debounce.
 * @param delay - The debounce delay in milliseconds.
 * @param options - Optional settings for debounce behavior.
 * @returns The debounced value.
 */
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
