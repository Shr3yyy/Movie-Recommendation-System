// File: components/Loader.js
import styles from '../styles/Loader.module.css'

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p className={styles.text}>Loading movies...</p>
      </div>
    </div>
  )
}
