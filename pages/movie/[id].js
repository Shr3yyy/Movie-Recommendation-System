import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import MovieGrid from '../../components/MovieGrid'
import Loader from '../../components/Loader'
import styles from '../../styles/MovieDetails.module.css'

export default function MovieDetails() {
  const router = useRouter()
  const { id } = router.query
  const [movie, setMovie] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchMovieDetails()
      fetchRecommendations()
    }
  }, [id])

  
  const fetchMovieDetails = async () => {
    try {
      const res = await fetch(`/api/movies/${id}`)
      const data = await res.json()
      setMovie(data)
    } catch (error) {
      console.error('Error fetching movie details:', error)
    } finally {
      setLoading(false)
    }
  }

 
  const fetchRecommendations = async () => {
    try {
      const res = await fetch(`/api/recommendations/${id}`)
      const data = await res.json()
      setRecommendations(data.results || [])
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    }
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <Loader />
      </div>
    )
  }

  if (!movie) {
    return (
      <div>
        <Navbar />
        <div className={styles.error}>Movie not found</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Navbar />
      
      <main className={styles.main}>
        
        <div className={styles.detailsContainer}>
          <div className={styles.posterContainer}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : '/placeholder.png'
              }
              alt={movie.title}
              className={styles.poster}
            />
          </div>

          <div className={styles.info}>
            <h1 className={styles.title}>{movie.title}</h1>
            
            <div className={styles.meta}>
              <span className={styles.rating}>⭐ {movie.vote_average?.toFixed(1)}</span>
              <span className={styles.date}>📅 {movie.release_date}</span>
              <span className={styles.runtime}>⏱️ {movie.runtime} min</span>
            </div>

            <div className={styles.genres}>
              {movie.genres?.map((genre) => (
                <span key={genre.id} className={styles.genre}>
                  {genre.name}
                </span>
              ))}
            </div>

            <div className={styles.overview}>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
            </div>

            {movie.tagline && (
              <div className={styles.tagline}>
                <em>"{movie.tagline}"</em>
              </div>
            )}
          </div>
        </div>

       
        {recommendations.length > 0 && (
          <section className={styles.recommendations}>
            <h2 className={styles.recommendationsTitle}>🎬 Recommended Movies</h2>
            <MovieGrid movies={recommendations.slice(0, 6)} />
          </section>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Movie Recommendation System © 2024 | Data provided by TMDB</p>
      </footer>
    </div>
  )
}
