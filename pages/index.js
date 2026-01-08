
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import MovieGrid from '../components/MovieGrid'
import GenreFilter from '../components/GenreFilter'
import Loader from '../components/Loader'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedGenre, setSelectedGenre] = useState(null)

  
  useEffect(() => {
    fetchAllMovies()
  }, [])

 
  const fetchAllMovies = async () => {
    setLoading(true)
    try {
     
      const trendingRes = await fetch('/api/movies/trending')
      const trendingData = await trendingRes.json()
      setTrendingMovies(trendingData.results || [])

     
      const popularRes = await fetch('/api/movies/popular')
      const popularData = await popularRes.json()
      setPopularMovies(popularData.results || [])

     
      const topRatedRes = await fetch('/api/movies/top-rated')
      const topRatedData = await topRatedRes.json()
      setTopRatedMovies(topRatedData.results || [])
    } catch (error) {
      console.error('Error fetching movies:', error)
    } finally {
      setLoading(false)
    }
  }


  const handleGenreChange = async (genreId) => {
    setSelectedGenre(genreId)
    
    if (!genreId) {
      setFilteredMovies([])
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/movies/by-genre?genreId=${genreId}`)
      const data = await res.json()
      setFilteredMovies(data.results || [])
    } catch (error) {
      console.error('Error fetching movies by genre:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Navbar />
      
      <main className={styles.main}>
       
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Discover Your Next Favorite Movie</h1>
          <p className={styles.heroSubtitle}>
            Explore trending, popular, and top-rated movies with personalized recommendations
          </p>
        </section>

       
        <GenreFilter onGenreChange={handleGenreChange} selectedGenre={selectedGenre} />

        {loading ? (
          <Loader />
        ) : (
          <>
            
            {selectedGenre ? (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Filtered Movies</h2>
                <MovieGrid movies={filteredMovies} />
              </section>
            ) : (
              <>
                
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>🔥 Trending Now</h2>
                  <MovieGrid movies={trendingMovies.slice(0, 6)} />
                </section>

              
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>⭐ Popular Movies</h2>
                  <MovieGrid movies={popularMovies.slice(0, 6)} />
                </section>

               
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>🏆 Top Rated</h2>
                  <MovieGrid movies={topRatedMovies.slice(0, 6)} />
                </section>
              </>
            )}
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Movie Recommendation System © 2024 | Data provided by TMDB</p>
      </footer>
    </div>
  )
}
