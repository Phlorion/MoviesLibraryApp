import React, { useEffect, useState } from "react";
import { getMovies } from "../api/MoviesService";
import MoviePoster from "./MoviePoster";
import { useSearchParams } from "react-router-dom";

const MoviesList = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  let filters = {
    page: parseInt(searchParams.get("page")) || 0,
    size: parseInt(searchParams.get("size")) || 100,
    genre: searchParams.get("genre") || null,
    type: searchParams.get("type") || null,
    minRating: parseInt(searchParams.get("minRating")) || null,
    minYear: parseInt(searchParams.get("minYear")) || null,
    maxYear: parseInt(searchParams.get("maxYear")) || null,
    containsInTitle: searchParams.get("containsInTitle") || null,
    sortRating: searchParams.get("sortRating") || null,
    sortYear: searchParams.get("sortYear") || null,
    sortPopularity: searchParams.get("sortPopularity") || null,
  };

  const currPage = filters.page;

  // create a sliding window of size 5 for the pages
  const startIndex = Math.max(0, currPage - 4);

  const getAllMovies = async (filters) => {
    try {
      // get no null entries of filters
      const noNull = Object.entries(filters).filter(
        ([key, value]) => value !== null && key !== "size" // hide size from client
      );
      const filtersNoNull = Object.fromEntries(noNull);
      // set parameters for fields that are not null
      setSearchParams(filtersNoNull);
      // call api and update user state
      const { data } = await getMovies(
        filters.page,
        filters.size,
        filters.genre,
        filters.type,
        filters.minRating,
        filters.minYear,
        filters.maxYear,
        filters.containsInTitle,
        filters.sortRating,
        filters.sortYear,
        filters.sortPopularity
      );
      setMoviesData(data);
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  };

  // get movies of specified page when the page is rendered
  useEffect(() => {
    getAllMovies(filters);
  }, [searchParams]);

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
          <button
            onClick={() => {
              filters.page = currPage - 1;
              getAllMovies(filters);
            }}
            className={currPage === 0 ? "disabled" : ""}
          >
            <span className="aquo prevent-select">&laquo;</span>
          </button>
          {[...Array(moviesData.totalPages).keys()]
            .slice(startIndex, startIndex + 5)
            .map((page) => {
              return (
                <button
                  onClick={() => {
                    filters.page = page;
                    getAllMovies(filters);
                  }}
                  className={page === currPage ? "disabled" : ""}
                  key={page}
                >
                  <span className="prevent-select">{page + 1}</span>
                </button>
              );
            })}
          <button
            onClick={() => {
              filters.page = currPage + 1;
              getAllMovies(filters);
            }}
            className={currPage + 1 === moviesData.totalPages ? "disabled" : ""}
          >
            <span className="aquo prevent-select">&raquo;</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
