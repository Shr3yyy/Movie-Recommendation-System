# 🎬 Movie Recommendation System

A modern, responsive movie recommendation web application built with **Next.js** that helps users discover and explore movies using real-time data from The Movie Database (TMDB) API.

---

## 📋 Problem Statement

With thousands of movies released every year, finding the right movie to watch can be overwhelming. This project aims to solve this problem by providing:

- Easy access to trending, popular, and top-rated movies
- Personalized movie recommendations based on viewing history
- Genre-based filtering to narrow down choices
- Detailed movie information including ratings, cast, and plot summaries

---

## ✨ Features

### Core Features
1. **Home Page with Multiple Sections**
   - 🔥 Trending Movies (Weekly)
   - ⭐ Popular Movies
   - 🏆 Top Rated Movies

2. **Smart Search**
   - Real-time movie search with debounced input
   - Instant results as you type

3. **Genre Filtering**
   - Filter movies by genre (Action, Comedy, Drama, etc.)
   - Easy dropdown selection

4. **Detailed Movie Pages**
   - High-quality poster images
   - Complete movie information (title, overview, rating, release date, runtime)
   - Genre tags
   - Movie tagline

5. **Recommendation System**
   - **Primary**: TMDB's built-in recommendation algorithm
   - **Fallback**: Genre-based similarity matching
   - Shows 6 recommended movies on each detail page

6. **Responsive Design**
   - Mobile-first approach
   - Works seamlessly on desktop, tablet, and mobile devices
   - Touch-friendly interface

7. **Modern UI/UX**
   - Clean, minimal design
   - Smooth animations and transitions
   - Hover effects on interactive elements
   - Loading skeletons for better UX

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework for server-side rendering and routing |
| **React 18** | UI component library |
| **CSS Modules** | Scoped styling without conflicts |
| **TMDB API** | Real-time movie data source |
| **Vercel** | Deployment platform |
