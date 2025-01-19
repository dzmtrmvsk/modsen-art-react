import styles from './styles.module.scss'

const Loader = () => {
  return (
    <div className={styles.loader}>
      <svg viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="50"></circle>
      </svg>
      <svg viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="50"></circle>
      </svg>
      <svg viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="50"></circle>
      </svg>
    </div>
  )
}

export default Loader
