// File: pages/search.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import MovieGrid from '../components/MovieGrid'
import Loader from '../components/Loader'
import styles from '../styles/Home.module.css'

export default function Search() {
  const router = useRouter()
  const { q } = router.query
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (q) {
      searchMovies(q)
    }
  }, [q])

  const searchMovies = async (query) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/movies/search?query=${encodeURIComponent(query)}`)
      const data = await res.json()
      setMovies(data.results || [])
    } catch (error) {
      console.error('Error searching movies:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Navbar />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Search Results</h1>
          {q && (
            <p className={styles.heroSubtitle}>
              Showing results for: <strong>{q}</strong>
            </p>
          )}
        </section>

        {loading ? (
          <Loader />
        ) : (
          <section className={styles.section}>
            {movies.length > 0 ? (
              <MovieGrid movies={movies} />
            ) : (
              <p className={styles.noResults}>
                {q ? 'No movies found. Try a different search term.' : 'Enter a search term to find movies.'}
              </p>
            )}
          </section>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Movie Recommendation System © 2024 | Data provided by TMDB</p>
      </footer>
    </div>
  )
}
