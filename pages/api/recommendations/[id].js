export default async function handler(req, res) {
  const { id } = req.query
  const API_KEY = process.env.TMDB_API_KEY
  
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  try {
   
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`
    )
    const data = await response.json()
    
    
    if (data.results && data.results.length > 0) {
      return res.status(200).json(data)
    }
    
    
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    )
    const movieData = await movieRes.json()
    
    if (movieData.genres && movieData.genres.length > 0) {
      const genreId = movieData.genres[0].id
      const similarRes = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
      )
      const similarData = await similarRes.json()
      return res.status(200).json(similarData)
    }
    
    res.status(200).json({ results: [] })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recommendations' })
  }
}
