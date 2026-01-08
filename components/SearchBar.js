import { useState, useEffect } from 'react'
import styles from '../styles/SearchBar.module.css'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
    }
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={handleChange}
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        🔍
      </button>
    </form>
  )
}
