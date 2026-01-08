import { useState, useEffect } from 'react'
import styles from '../styles/GenreFilter.module.css'

export default function GenreFilter({ onGenreChange, selectedGenre }) {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    fetchGenres()
  }, [])

  const fetchGenres = async () => {
    try {
      const res = await fetch('/api/movies/genres')
      const data = await res.json()
      setGenres(data.genres || [])
    } catch (error) {
      console.error('Error fetching genres:', error)
    }
  }

  const handleChange = (e) => {
    const genreId = e.target.value
    onGenreChange(genreId ? parseInt(genreId) : null)
  }

  return (
    <div className={styles.filterContainer}>
      <label htmlFor="genre-select" className={styles.label}>
        Filter by Genre:
      </label>
      <select
        id="genre-select"
        className={styles.select}
        value={selectedGenre || ''}
        onChange={handleChange}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  )
}
