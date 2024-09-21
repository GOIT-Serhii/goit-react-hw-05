import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { Suspense, useEffect, useRef, useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { ColorRing } from "react-loader-spinner";
import clsx from "clsx";

import { getMovieById } from "../../api";
import css from "./MovieDetailsPage.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const getNavLinkClass = (props) => {
  return clsx(css.link, props.isActive && css.active);
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");

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
    <div className={css.container}>
      <button className={css.buttonBack} type="button">
        <Link to={backLinkRef.current} className={css.linkBack}>
          <FaCircleArrowLeft className={css.icon} />
          Go back
        </Link>
      </button>
      <ul className={css.movieList}>
        <li className={css.movieListItem}>
          <img
            className={css.imgPoster}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : defaultImg
            }
            width={250}
            alt="poster"
          />
        </li>
        <li className={css.movieListItem}>
          <h2 className={css.movieTitle}>{movie.original_title}</h2>
          <p className={css.movieText}>
            User score: {Math.round(movie.vote_average) * 10}%
          </p>
          <h2 className={css.movieTitle}>Overview</h2>
          <p className={css.movieText}>{movie.overview}</p>
          <h2 className={css.movieTitle}>Genres</h2>
          {movie.genres?.length > 0 && (
            <ul className={css.movieGenresList}>
              {movie.genres.map((item) => (
                <li key={item.id}>
                  <p className={css.movieText}>{item.name}</p>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>

      <div className={css.wrapBottom}>
        <p className={css.addTittle}>Additinal information</p>
        <ul className={css.navList}>
          <li>
            <NavLink to="cast" className={getNavLinkClass}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={getNavLinkClass}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet movie={movie} />
        </Suspense>
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
    </div>
  );
}
