import styles from './styles.module.scss'

interface NoResultsMessageProps {
  query: string
}

const NoResultsMessage = ({ query }: NoResultsMessageProps) => {
  return (
    <p className={styles.noResultsMessage}>
      No artworks found for <mark>{query}</mark>
    </p>
  )
}

export default NoResultsMessage
