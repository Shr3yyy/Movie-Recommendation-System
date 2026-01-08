import { useState } from 'react'
import { useRouter } from 'next/router'
import SearchBar from './SearchBar'
import styles from '../styles/Navbar.module.css'

export default function Navbar() {
  const router = useRouter()

  const handleSearch = (query) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  const goHome = () => {
    router.push('/')
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={goHome}>
          <span className={styles.logoIcon}>🎬</span>
          <span className={styles.logoText}>MovieRec</span>
        </div>
        
        <div className={styles.searchContainer}>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </nav>
  )
}
