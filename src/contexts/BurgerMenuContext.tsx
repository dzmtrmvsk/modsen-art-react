import { FC, PropsWithChildren, createContext, useCallback, useContext, useState } from 'react'

export interface BurgerMenuContextInterface {
  isMenuOpened: boolean
  openMenu: () => void
  closeMenu: () => void
  toggleMenu: () => void
}

export const BurgerMenuContext = createContext({} as BurgerMenuContextInterface)

export const useBurgerMenuContext = () => {
  return useContext(BurgerMenuContext)
}

export const BurgerMenuContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isMenuOpened, setMenuOpened] = useState(false)

  const closeMenu = useCallback(() => {
    setMenuOpened(false)
  }, [setMenuOpened])

  const openMenu = useCallback(() => {
    setMenuOpened(true)
  }, [setMenuOpened])

  const toggleMenu = useCallback(() => {
    setMenuOpened((previous) => !previous)
  }, [setMenuOpened])

  return (
    <BurgerMenuContext.Provider value={{ isMenuOpened, openMenu, closeMenu, toggleMenu }}>
      {children}
    </BurgerMenuContext.Provider>
  )
}
