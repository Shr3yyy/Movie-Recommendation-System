


export default async function handler(req, res) {
  const { id } = req.query
  const API_KEY = process.env.TMDB_API_KEY
  
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    )
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie details' })
  }
}
