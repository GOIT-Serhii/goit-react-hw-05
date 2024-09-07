import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movie }) {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movie.map((item) => (
        <li key={item.id} className={css.movieListItem}>
          <Link to={`/movies/${item.id}`} state={location}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
