import { ReactNode } from 'react'

import styles from './styles.module.scss'

interface ContainerProps {
  extraClass?: string
  content: ReactNode
}

const Container = ({ extraClass, content }: ContainerProps) => {
  return <div className={`${styles.container} ${extraClass}`}>{content}</div>
}

export default Container
