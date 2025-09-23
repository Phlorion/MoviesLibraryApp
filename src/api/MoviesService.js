import axios from "axios";

const API_URL = "http://localhost:8080/movies";

export async function getMovies(filter) {
  var parameterString = `?page=${filter.page}&size=${filter.size}&`;

  // add parameters that are defined
  if (filter.genre != null) parameterString += `genre=${filter.genre}&`;
  if (filter.type != null) parameterString += `type=${filter.type}&`;
  if (filter.minRating != null) parameterString += `minRating=${filter.minRating}&`;
  if (filter.minYear != null) parameterString += `minYear=${filter.minYear}&`;
  if (filter.maxYear != null) parameterString += `maxYear=${filter.maxYear}&`;
  if (filter.containsInTitle != null)
    parameterString += `containsInTitle=${filter.containsInTitle}&`;
  if (filter.sortRating != null) parameterString += `sortRating=${filter.sortRating}&`;
  if (filter.sortYear != null) parameterString += `sortYear=${filter.sortYear}&`;
  if (filter.sortPopularity != null)
    parameterString += `sortPopularity=${filter.sortPopularity}&`;

  parameterString.substring(0, parameterString.length - 1); // remove last ampersand

  return await axios.get(`${API_URL}${parameterString}`);
}

export async function getMovie(id) {
  return await axios.get(`${API_URL}/${id}`);
}

export async function postComment(comment) {
  return await axios.post(`${API_URL}/postComment`, comment);
}
