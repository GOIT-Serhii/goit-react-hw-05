import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";

import { fetchTopMovies } from "../../api";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    async function getTopMovies() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetchTopMovies();
        setTopMovies(res.results);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getTopMovies();
  }, []);

  return (
    <div>
      {topMovies.length > 0 && <MovieList movie={topMovies} />}
      {error && <b>ERROR!!!</b>}
      {loading && <b>LOADING</b>}
    </div>
  );
}
