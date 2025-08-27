import React, { useEffect, useState } from "react";
import { getMovies } from "../api/MoviesService";
import MoviePoster from "./MoviePoster";
import { useSearchParams } from "react-router-dom";

const MoviesList = ({}) => {
  const [moviesData, setMoviesData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currPage = parseInt(searchParams.get("page")) || 0;

  // create a sliding window of size 5 for the pages
  const startIndex = Math.max(0, currPage - 4);

  const getAllMovies = async (page = 0, size = 100) => {
    try {
      // render the current page
      setSearchParams({ page: page });
      // call api and update user state
      const { data } = await getMovies(page, size);
      setMoviesData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // get movies of specified page when the page is rendered
  useEffect(() => {
    getAllMovies(currPage);
  }, [currPage]);

  return moviesData.length === 0 ? (
    <p>Loading movies</p>
  ) : (
    <div className="movies__container">
      <ul className="movieslist__grid">
        {moviesData.content.map((movie) => (
          <MoviePoster movie={movie} key={movie.imdb.id} />
        ))}
      </ul>

      {moviesData.content && moviesData.totalPages > 1 && (
        <div className="pageable">
          <a
            onClick={() => getAllMovies(currPage - 1)}
            className={currPage === 0 ? "disabled" : ""}
          >
            <span className="aquo">&laquo;</span>
          </a>
          {[...Array(moviesData.totalPages).keys()]
            .slice(startIndex, startIndex + 5)
            .map((page) => {
              return (
                <a
                  onClick={() => getAllMovies(page)}
                  className={page === currPage ? "disabled" : ""}
                  key={page}
                >
                  <span>{page + 1}</span>
                </a>
              );
            })}
          <a
            onClick={() => getAllMovies(currPage + 1)}
            className={currPage + 1 === moviesData.totalPages ? "disabled" : ""}
          >
            <span className="aquo">&raquo;</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
