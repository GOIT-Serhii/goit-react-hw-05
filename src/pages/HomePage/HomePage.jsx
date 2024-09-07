import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { ColorRing } from "react-loader-spinner";

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
    <div className={css.container}>
      <h2 className={css.trendTitile}>Trending today</h2>
      {topMovies.length > 0 && <MovieList movie={topMovies} />}
      {error && <b>ERROR!!!</b>}
      {loading && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      )}
    </div>
  );
}
