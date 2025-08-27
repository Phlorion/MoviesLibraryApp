import React from "react";

const ShortDescription = ({ movie }) => {
  const arrayToString = (array) => {
    var result = "";
    array.forEach((element) => {
      result += `${element}, `;
    });
    result = result.substring(0, result.length - 2);
    return result;
  };

  return (
    <div className="description__container">
      <div className="description__left">
        <h2>{movie.title}</h2>
        <div className="movie__year__runtime">
          {movie.year && <p>{movie.year}</p>}
          {movie.runtime && <p>{movie.runtime} min</p>}
        </div>
        {movie.fullplot && (
          <div className="movie__plot">
            <p>{movie.fullplot}</p>
          </div>
        )}
        {movie.genres && movie.genres.length > 0 && (
          <div className="movie__genres">
            <p>{arrayToString(movie.genres)}</p>
          </div>
        )}
        {movie.cast && movie.cast.length > 0 && (
          <div className="movie__cast">
            <p>{arrayToString(movie.cast.slice(0, 3))}</p>
          </div>
        )}
      </div>
      <div className="description__right">
        <div className="movie__imagewrapper">
          <img
            src={
              movie.poster != null ? movie.poster : "/No-Image-Placeholder.png"
            }
            alt="/No-Image-Placeholder.png"
            onError={(error) =>
              (error.target.src = "/No-Image-Placeholder.png")
            }
          ></img>
        </div>
      </div>
    </div>
  );
};

export default ShortDescription;
