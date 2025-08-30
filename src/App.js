import "./App.css";
import MoviesList from "./components/MoviesList";
import { Routes, Route, Navigate } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import NavBar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <nav>
        <NavBar />
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to={"/movies"} />} />
          <Route path="/movies" element={<MoviesList />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
