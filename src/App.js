import "./App.css";
import MoviesList from "./components/MoviesList";
import { Routes, Route, Navigate } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import NavBar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./components/Home";

function App() {
  return (
    <>
      <nav>
        <NavBar />
      </nav>
      <main>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/home" element={<Home />}></Route>
          <Route path="/movies" element={<MoviesList />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
