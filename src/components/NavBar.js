import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMovies } from "../api/MoviesService";

const NavBar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [dropDownReady, setDropDownReady] = useState(false);
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState(null);

  const searchForMovies = async (input) => {
    try {
      // if input is nothing then return empty results
      if (input.trim().length === 0) {
        setSearchResults([]);
        return;
      }

      setSearchInput(input);

      const { data } = await getMovies(
        0,
        5,
        null,
        null,
        null,
        null,
        null,
        input,
        null,
        null,
        "desc"
      );
      if (data.content.length > 0) setSearchResults(data.content);
      else setSearchResults([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  const handleMovieSearch = (input) => {
    navigate({
      pathname: '/movies',
      search: `?containsInTitle=${input}`
    })
  }

  return (
    <>
      <div className="nav__container">
        <p className="prevent-select">MoviesLib</p>
        <ul className="nav__navigation">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/movies"}>Library</Link>
          </li>
          <li>
            <div className="nav__search_wrapper">
              <input
                className="nav__search"
                placeholder="Search..."
                onChange={(e) => searchForMovies(e.target.value)}
                onFocus={() => setDropDownReady(true)}
                onBlur={() => setDropDownReady(false)}
              ></input>
              <button className="nav__search_btn" onClick={() => handleMovieSearch(searchInput)}>
                <i className="bi bi-search"></i>
              </button>
            </div>
          </li>
          <li>
            <Link to={"/"}>About</Link>
          </li>
          <li>
            <Link to={"/"}>Help</Link>
          </li>
        </ul>
        <div className="nav__account_container"></div>
      </div>
      <div
        className={
          dropDownReady && searchResults && searchResults.length > 0
            ? "nav__search_dropdown"
            : "nav__search_dropdown hidden"
        }
      >
        <ul>
          {searchResults &&
            searchResults.map((movie) => (
              <li
                key={movie._id}
                onMouseDown={() => handleMovieClick(movie.imdb.id)}
              >
                <div className="nav__search_dropwdown_result">
                  <div className="nav__search_dropwdown_result_imgwrapper">
                    <img
                      src={
                        movie.poster != null
                          ? movie.poster
                          : "/No-Image-Placeholder.png"
                      }
                      alt="/No-Image-Placeholder.png"
                    ></img>
                  </div>
                  <span>{movie.title}</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default NavBar;
