import { PropsWithChildren } from 'react'

import styles from './styles.module.scss'

interface PageTitleProps extends PropsWithChildren {
  className?: string
}

const PageTitle = ({ children, className }: PageTitleProps) => {
  return <h1 className={`${styles.title} ${className || ''}`.trim()}>{children}</h1>
}

export default PageTitle
