import styles from './styles.module.scss'

interface ContainerProps extends React.PropsWithChildren {
  className?: string
}

const Container = ({ className, children }: ContainerProps) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>
}

export default Container
