import { useEffect, useRef, useState } from "react";
import { getMovies } from "../api/MoviesService";
import MoviePoster from "./MoviePoster";

const Home = () => {
  const [filteredMovies, setFilteredMovies] = useState({
    top_rated: [],
    recent: [],
    series: [],
  });
  const mediaScrollerRef_toprated = useRef(null);
  const mediaScrollerRef_recent = useRef(null);
  const mediaScrollerRef_series = useRef(null);

  const scroll = (scroller, dir) => {
    const scrollAmount = 200;

    if (dir === "right") {
      scroller.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    } else {
      scroller.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getMoviesByFilters = async (
    field,
    page = 0,
    size = 25,
    genre = null,
    type = null,
    minRating = null,
    minYear = null,
    maxYear = null,
    containsInTitle = null,
    sortRating = null,
    sortYear = null,
    sortPopularity = null
  ) => {
    const { data } = await getMovies(
      page,
      size,
      genre,
      type,
      minRating,
      minYear,
      maxYear,
      containsInTitle,
      sortRating,
      sortYear,
      sortPopularity
    );

    setFilteredMovies((prevFilteredMovies) => ({
      ...prevFilteredMovies,
      [field]: data.content,
    }));
  };

  useEffect(() => {
    // AWFUL way to pass the arguements. TODO: Pass the arguements as an object and deconstruct in api service function
    getMoviesByFilters(
      "top_rated",
      0,
      15,
      null,
      "movie",
      7,
      null,
      null,
      null,
      "desc",
      null,
      null
    );
    getMoviesByFilters(
      "recent",
      0,
      15,
      null,
      null,
      null,
      2010,
      null,
      null,
      null,
      "desc",
      null
    );
    getMoviesByFilters(
      "series",
      0,
      15,
      null,
      "series",
      5,
      null,
      null,
      null,
      "desc",
      null,
      null
    );
  }, []);

  return filteredMovies.top_rated.length === 0 &&
    filteredMovies.recent.length === 0 &&
    filteredMovies.series.length === 0 ? (
    <p>Loading...</p>
  ) : (
    <ul className="home__container">
      <li className="home__media top-rated">
        <h1>Top Rated</h1>
        <hr />
        <div className="media-scroller-container">
          <button
            className="scroll-btn left-btn"
            onClick={() => scroll(mediaScrollerRef_toprated.current, "left")}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          <div
            className="media-scroller snaps-inline"
            ref={mediaScrollerRef_toprated}
          >
            {filteredMovies.top_rated.map((movie) => (
              <div className="media" key={movie.imdb.id}>
                <MoviePoster movie={movie} />
                <span>{movie.title}</span>
              </div>
            ))}
          </div>
          <button
            className="scroll-btn right-btn"
            onClick={() => scroll(mediaScrollerRef_toprated.current, "right")}
          >
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </li>
      <li className="home__media recent">
        <h1>Recent</h1>
        <hr />
        <div className="media-scroller-container">
          <button
            className="scroll-btn left-btn"
            onClick={() => scroll(mediaScrollerRef_recent.current, "left")}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          <div
            className="media-scroller snaps-inline"
            ref={mediaScrollerRef_recent}
          >
            {filteredMovies.recent.map((movie) => (
              <div className="media" key={movie.imdb.id}>
                <MoviePoster movie={movie} />
                <span>{movie.title}</span>
              </div>
            ))}
          </div>
          <button
            className="scroll-btn right-btn"
            onClick={() => scroll(mediaScrollerRef_recent.current, "right")}
          >
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </li>
      <li className="home__media series">
        <h1>Series</h1>
        <hr />
        <div className="media-scroller-container">
          <button
            className="scroll-btn left-btn"
            onClick={() => scroll(mediaScrollerRef_series.current, "left")}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          <div
            className="media-scroller snaps-inline"
            ref={mediaScrollerRef_series}
          >
            {filteredMovies.series.map((movie) => (
              <div className="media" key={movie.imdb.id}>
                <MoviePoster movie={movie} />
                <span>{movie.title}</span>
              </div>
            ))}
          </div>
          <button
            className="scroll-btn right-btn"
            onClick={() => scroll(mediaScrollerRef_series.current, "right")}
          >
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </li>
    </ul>
  );
};

export default Home;
