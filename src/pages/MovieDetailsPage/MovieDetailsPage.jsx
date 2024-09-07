import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { Suspense, useEffect, useRef, useState } from "react";

import { getMovieById } from "../../api";
import css from "./MovieDetailsPage.module.css";

const defaultImg =
  "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function fetchMovie() {
      try {
        if (!movieId) return;
        setLoading(true);
        setError(false);
        const res = await getMovieById(movieId);
        setMovie(res);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [movieId]);

  return (
    <div>
      <Link to={backLinkRef}>Back</Link>
      <div>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : defaultImg
          }
          width={250}
          alt="poster"
        />
        <h2>{movie.original_title}</h2>
        <p>User score: {movie.vote_average * 10}%</p>
        <p>Overview</p>
        <p>{movie.overview}</p>
        <p>Genres</p>
        {movie.genres?.length > 0 && (
          <ul>
            {movie.genres.map((item) => (
              <li key={item.id}>
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <p>Additinal infaormation</p>
        <ul>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet movie={movie} />
        </Suspense>
      </div>
      {error && <b>ERROR!!!</b>}
      {loading && <b>Loading!!!</b>}
    </div>
  );
}
