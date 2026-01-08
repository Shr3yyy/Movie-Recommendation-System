// File: pages/api/movies/by-genre.js

// API route to fetch movies by genre
export default async function handler(req, res) {
  const { genreId } = req.query
  const API_KEY = process.env.TMDB_API_KEY
  
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  if (!genreId) {
    return res.status(400).json({ error: 'Genre ID is required' })
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
    )
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies by genre' })
  }
}
