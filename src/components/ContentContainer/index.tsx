import { ReactNode } from 'react'

import styles from './styles.module.scss'

export interface ContainerProps {
  extraClass?: string
  content: ReactNode
}

export const Container = ({ extraClass, content }: ContainerProps) => {
  return <div className={`${styles.wrapper} ${extraClass}`}>{content}</div>
}
