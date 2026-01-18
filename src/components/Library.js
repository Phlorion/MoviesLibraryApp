import { React, useState, useRef, useEffect } from "react";
import Filter from "../utils/Filter";
import { getMovies } from "../api/MoviesService";
import MoviePoster from "./MoviePoster";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const navigate = useNavigate();
  const [showcasedCollections, setShowcasedCollections] = useState({
    movies: [],
    series: [],
    drama: [],
    comedy: [],
    action: [],
  });

  const mediaScrollerRefs = {
    movies: useRef(null),
    series: useRef(null),
    drama: useRef(null),
    comedy: useRef(null),
    action: useRef(null),
  };

  const collectionFilters = {
    movies: new Filter(0, 25)
      .setType("movie")
      .setMinRating(7)
      .isSortRating("desc")
      .build(),
    series: new Filter(0, 25)
      .setType("series")
      .setMinRating(5)
      .isSortRating("desc")
      .build(),
    drama: new Filter(0, 25)
      .setGenre("Drama")
      .setMinRating(5)
      .isSortPopularity("desc")
      .build(),
    comedy: new Filter(0, 25)
      .setGenre("Comedy")
      .setMinRating(5)
      .isSortPopularity("desc")
      .build(),
    action: new Filter(0, 25)
      .setGenre("Action")
      .setMinRating(5)
      .isSortPopularity("desc")
      .build(),
  };

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

  const getCollectionsByFilter = async (field, filter) => {
    const { data } = await getMovies(filter);

    setShowcasedCollections((prevShocasedCollections) => ({
      ...prevShocasedCollections,
      [field]: data.content,
    }));
  };

  useEffect(() => {
    Object.keys(collectionFilters).forEach((category) => {
      getCollectionsByFilter(category, collectionFilters[category]);
    });
  }, []);

  const isEmpty = Object.values(showcasedCollections).every(
    (collection) => collection.length === 0,
  );

  const createSearchParamsFromFilter = (filter) => {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params.append(key, value);
      }
    });
    return params.toString();
  };

  const seeAllClick = (category) => {
    navigate(
      `/library/collections?${createSearchParamsFromFilter(collectionFilters[category])}`,
    );
  };

  return isEmpty ? (
    <p>Loading...</p>
  ) : (
    <ul className="home__container">
      {Object.keys(showcasedCollections).map((category) => (
        <li className="home__media top-rated" key={category}>
          <h1>{category[0].toUpperCase() + category.slice(1)}</h1>
          <hr />
          <div className="media-scroller-container">
            <button
              className="scroll-btn left-btn"
              onClick={() =>
                scroll(mediaScrollerRefs[category].current, "left")
              }
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <div
              className="media-scroller snaps-inline"
              ref={mediaScrollerRefs[category]}
            >
              {showcasedCollections[category].map((media) => (
                <div className="media" key={media.imdb.id}>
                  <MoviePoster movie={media} />
                  <span>{media.title}</span>
                </div>
              ))}
              <div className="media">
                <div
                  className="movieposter__wrapper"
                  onClick={() => seeAllClick(category)}
                ></div>
                <span>See All</span>
              </div>
            </div>
            <button
              className="scroll-btn right-btn"
              onClick={() =>
                scroll(mediaScrollerRefs[category].current, "right")
              }
            >
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Library;
