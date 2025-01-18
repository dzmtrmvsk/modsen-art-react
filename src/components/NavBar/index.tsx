import { ROUTE_CONFIG } from '@/routes'
import NavLink from '@/components/NavLink'

import styles from './styles.module.scss'

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      {Object.values(ROUTE_CONFIG)
        .filter((route) => route.navigation !== null)
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
