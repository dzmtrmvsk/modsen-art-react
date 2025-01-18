import { Link } from 'react-router-dom'

import artGalleryLogoDarkSrc from '@/assets/icons/museum-dark-logo.svg'
import artGalleryLogoLightSrc from '@/assets/icons/museum-light-logo.svg'
import { ROUTE_CONFIG } from '@/routes'

import styles from './styles.module.scss'

interface GalleryLogoProps {
  type?: 'minimal' | 'dark' | 'light'
}

export function GalleryLogo({ type = 'light' }: GalleryLogoProps) {
  const logoVariants = {
    dark: artGalleryLogoDarkSrc,
    light: artGalleryLogoLightSrc
  }

  const selectedLogo = logoVariants[type]

  return (
    <Link className={styles.galleryLogo} to={ROUTE_CONFIG.home.generatePath()}>
      <img className={styles.galleryLogo__image} src={selectedLogo} alt="Art Gallery Logo" />
    </Link>
  )
}
