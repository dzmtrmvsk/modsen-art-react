import { RefObject, useEffect } from 'react'

const useOutsideClick = (
  targetRef: RefObject<HTMLElement>,
  onOutsideClick: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (!targetRef.current || targetRef.current.contains(event.target as Node)) {
        return
      }
      onOutsideClick(event)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    }
  }, [targetRef, onOutsideClick])
}

export { useOutsideClick }
