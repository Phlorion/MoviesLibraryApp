import React from "react";
import { useNavigate } from "react-router-dom";

const MoviePoster = ({ movie }) => {
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <div
      className="movieposter__wrapper"
      onClick={() => handleMovieClick(movie.imdb.id)}
    >
      <img
        className="movieposter__img"
        src={movie.poster != null ? movie.poster : "/No-Image-Placeholder.png"}
        alt="/No-Image-Placeholder.png"
        onError={(error) => (error.target.src = "/No-Image-Placeholder.png")}
      />
    </div>
  );
};

export default MoviePoster;
