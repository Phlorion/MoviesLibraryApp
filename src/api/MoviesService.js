import axios from "axios";

const API_URL = "http://localhost:8080/movies";

export async function getMovies(page = 0, size = 25) {
  return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getMovie(id) {
  return await axios.get(`${API_URL}/${id}`);
}

export async function postComment(comment) {
  return await axios.post(`${API_URL}/postComment`, comment);
}

export async function getFilteredMovies(
  genre = null,
  type = null,
  minRating = null,
  minYear = null,
  maxYear = null,
  sortRating = null,
  sortYear = null,
  limit = null
) {
  var parameterString = "?";

  // add parameters that are defined
  if (genre != null) parameterString += `genre=${genre}&`;
  if (type != null) parameterString += `type=${type}&`;
  if (minRating != null) parameterString += `minRating=${minRating}&`;
  if (minYear != null) parameterString += `minYear=${minYear}&`;
  if (maxYear != null) parameterString += `maxYear=${maxYear}&`;
  if (sortRating != null) parameterString += `sortRating=${sortRating}&`;
  if (sortYear != null) parameterString += `sortYear=${sortYear}&`;
  if (limit != null) parameterString += `limit=${limit}&`;

  // create parameter string if at least one parameter added
  if (parameterString.length > 1) {
    parameterString.substring(0, parameterString.length - 1); // remove last ampersand
  } else {
    parameterString = "";
  }

  return await axios.get(`${API_URL}/search${parameterString}`);
}
