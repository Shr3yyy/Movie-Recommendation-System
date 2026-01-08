import { useRouter } from 'next/router'
import styles from '../styles/MovieCard.module.css'

export default function MovieCard({ movie }) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/movie/${movie.id}`)
  }


  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.png'

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <img
          src={posterUrl}
          alt={movie.title}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <button className={styles.viewButton}>View Details</button>
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{movie.title}</h3>
        <div className={styles.info}>
          <span className={styles.rating}>⭐ {movie.vote_average?.toFixed(1)}</span>
          <span className={styles.date}>{movie.release_date?.split('-')[0]}</span>
        </div>
      </div>
    </div>
  )
}
