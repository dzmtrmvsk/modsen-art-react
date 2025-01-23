import styles from './styles.module.scss'

interface LoaderProps {
  text?: string
}

const Loader = ({ text }: LoaderProps) => {
  return (
    <div className={styles.loader} data-testid="loader">
      <div className={styles.loader__circles}>
        <svg className={styles.loader__circle} viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="50"></circle>
        </svg>
        <svg className={styles.loader__circle} viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="50"></circle>
        </svg>
        <svg className={styles.loader__circle} viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="50"></circle>
        </svg>
      </div>
      {text && <p className={styles.loader__text}>{text}</p>}
    </div>
  )
}

export default Loader
