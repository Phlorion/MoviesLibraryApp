import React, { useEffect, useState } from "react";
import { getMovies } from "../api/MoviesService";
import MoviePoster from "./MoviePoster";
import { useLocation, useSearchParams } from "react-router-dom";
import Filter from "../utils/Filter";

const MoviesList = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  let filter = new Filter(
    parseInt(searchParams.get("page")) || 0,
    parseInt(searchParams.get("size")) || 100,
  )
    .setGenre(searchParams.get("genre") || null)
    .setType(searchParams.get("type") || null)
    .setMinRating(parseInt(searchParams.get("minRating")) || null)
    .setMinYear(parseInt(searchParams.get("minYear")) || null)
    .setMaxYear(parseInt(searchParams.get("maxYear")) || null)
    .setContainsInTitle(searchParams.get("containsInTitle") || null)
    .isSortRating(searchParams.get("sortRating") || null)
    .isSortYear(searchParams.get("sortYear") || null)
    .isSortPopularity(searchParams.get("sortPopularity") || null)
    .build();

  const currPage = filter.page;

  // create a sliding window of size 5 for the pages
  const startIndex = Math.max(0, currPage - 4);

  const getAllMovies = async (filter) => {
    try {
      // get no null entries of filters
      const noNull = Object.entries(filter).filter(
        ([key, value]) => value !== null && key !== "size", // hide size from client
      );
      const filtersNoNull = Object.fromEntries(noNull);
      // set parameters for fields that are not null
      setSearchParams(filtersNoNull);
      // call api and update user state
      const { data } = await getMovies(filter);
      setMoviesData(data);
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  };

  // get movies of specified page when the page is rendered
  useEffect(() => {
    getAllMovies(filter);
  }, [searchParams]);

  return moviesData.length === 0 ? (
    <p>Loading movies</p>
  ) : (
    <div className="movies__container">
      <ul className="movieslist__grid">
        {moviesData.content.map((movie) => (
          <li>
            <MoviePoster movie={movie} key={movie.imdb.id} />
            <span>{movie.title}</span>
          </li>
        ))}
      </ul>

      {moviesData.content && moviesData.totalPages > 1 && (
        <div className="pageable">
          <button
            onClick={() => {
              filter.page = currPage - 1;
              getAllMovies(filter);
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
                    filter.page = page;
                    getAllMovies(filter);
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
              filter.page = currPage + 1;
              getAllMovies(filter);
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
