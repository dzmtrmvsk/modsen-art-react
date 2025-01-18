import { ROUTE_CONFIG } from '@/routes'
import NavLink from '@/components/NavLink'
import { useLocation } from 'react-router-dom'

import styles from './styles.module.scss'

const NavBar = () => {
  const location = useLocation()

  return (
    <nav className={styles.navbar}>
      {Object.values(ROUTE_CONFIG)
        .filter(
          (route) => route.navigation !== null && (route.path !== '/' || location.pathname !== '/')
        )
        .map((route) => (
          <NavLink
            key={route.path}
            destination={route.generatePath()}
            label={route.navigation.label}
            iconUrl={route.navigation.icon}
          />
        ))}
    </nav>
  )
}

export default NavBar
