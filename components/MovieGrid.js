// File: components/MovieGrid.js
import MovieCard from './MovieCard'
import styles from '../styles/Home.module.css'

export default function MovieGrid({ movies }) {
  if (!movies || movies.length === 0) {
    return <p className={styles.noMovies}>No movies to display</p>
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
