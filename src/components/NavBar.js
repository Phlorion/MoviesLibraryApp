import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMoviesByTitle } from "../api/MoviesService";

const NavBar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [dropDownActive, setDropDownActive] = useState(false);
  const navigate = useNavigate();

  const searchForMovies = async (input) => {
    try {
      const { data } = await getMoviesByTitle(input, 5);
      if (data.length > 0) setSearchResults(data);
      else setSearchResults([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

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
                onFocus={() => setDropDownActive(true)}
                onBlur={() => setDropDownActive(false)}
              ></input>
              <button className="nav__search_btn">
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
          dropDownActive
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
