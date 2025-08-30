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
