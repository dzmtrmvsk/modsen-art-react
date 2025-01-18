import { Link } from 'react-router-dom'

import styles from './styles.module.scss'

interface NavLinkProps {
  destination: string
  label: string
  iconUrl: string
}

const NavLink = ({ destination, label, iconUrl }: NavLinkProps) => {
  return (
    <Link className={styles.navLink} to={destination}>
      <img className={styles.navLink__icon} src={iconUrl} alt={label + 'icon'} />
      <span className={styles.navLink__label}>{label}</span>
    </Link>
  )
}

export default NavLink
