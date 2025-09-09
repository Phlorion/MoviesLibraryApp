import axios from "axios";

const API_URL = "http://localhost:8080/movies";

export async function getMovies(
  page = 0,
  size = 100,
  genre = null,
  type = null,
  minRating = null,
  minYear = null,
  maxYear = null,
  containsInTitle = null,
  sortRating = null,
  sortYear = null,
  sortPopularity = null
) {
  var parameterString = `?page=${page}&size=${size}&`;

  // add parameters that are defined
  if (genre != null) parameterString += `genre=${genre}&`;
  if (type != null) parameterString += `type=${type}&`;
  if (minRating != null) parameterString += `minRating=${minRating}&`;
  if (minYear != null) parameterString += `minYear=${minYear}&`;
  if (maxYear != null) parameterString += `maxYear=${maxYear}&`;
  if (containsInTitle != null)
    parameterString += `containsInTitle=${containsInTitle}&`;
  if (sortRating != null) parameterString += `sortRating=${sortRating}&`;
  if (sortYear != null) parameterString += `sortYear=${sortYear}&`;
  if (sortPopularity != null)
    parameterString += `sortPopularity=${sortPopularity}&`;

  parameterString.substring(0, parameterString.length - 1); // remove last ampersand

  return await axios.get(`${API_URL}${parameterString}`);
}

export async function getMovie(id) {
  return await axios.get(`${API_URL}/${id}`);
}

export async function postComment(comment) {
  return await axios.post(`${API_URL}/postComment`, comment);
}
