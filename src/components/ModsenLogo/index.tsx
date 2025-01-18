import { Link } from 'react-router-dom'
import modsenLogoSrc from '@/assets/icons/modsen-logo.svg'
import { ROUTE_CONFIG } from '@/routes'

import styles from './styles.module.scss'

const ModsenLogo = () => {
  return (
    <Link className={styles.modsen} to={ROUTE_CONFIG.home.generatePath()}>
      <img className={styles.modsen__image} src={modsenLogoSrc} alt="ModsenLogo" />
    </Link>
  )
}

export default ModsenLogo
