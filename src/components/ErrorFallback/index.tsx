import styles from './styles.module.scss'

interface ErrorFallbackProps {
  error: Error | null
  resetErrorBoundary?: () => void
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <div className={styles.error}>
      <div className={styles.error__content}>
        <h1 className={styles.error__title}>Oops, something went wrong!</h1>
        <p className={styles.error__message}>
          We are sorry for the inconvenience. Our team has been notified, and we are working to
          restore this module as soon as possible.
        </p>
        {error && (
          <details className={styles.error__details}>
            <summary className={styles.error__details_summary}>See error details</summary>
            <pre className={styles.error__details_text}>{error.message}</pre>
          </details>
        )}
        <div className={styles.error__actions}>
          {resetErrorBoundary && (
            <button className={styles.error__button} onClick={resetErrorBoundary} type="button">
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback
