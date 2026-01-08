// File: pages/api/movies/top-rated.js

// API route to fetch top rated movies from TMDB
export default async function handler(req, res) {
  const API_KEY = process.env.TMDB_API_KEY
  
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    )
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top rated movies' })
  }
}
