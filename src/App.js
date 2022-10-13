import "./App.css";
import React, { useEffect, useState } from "react";
import SearchIcon from "./components/Search.svg";
import MovieCard from "./components/MovieCard";

const API_Url = "http://www.omdbapi.com?apiKey=c1a867fc";
function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  const searchMovies = async (title) => {
    const response = await fetch(`${API_Url}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Enter the name for Search a movie "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={()=>{searchMovies(searchTerm)}}
        />

        <img src={SearchIcon} alt="Search" onClick={() =>searchMovies(searchTerm) } />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie)  => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
