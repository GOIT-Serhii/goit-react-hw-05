import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

import { getMovieCastById } from "../../api";
import css from "./MovieCast.module.css";

const defaultImg =
  "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";

export default function MovieCast() {
  const { movieId } = useParams();

  const [movieCast, setMovieCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        if (!movieId) return;
        setLoading(true);
        setError(false);
        const res = await getMovieCastById(movieId);
        setMovieCast(res.cast);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieCast();
  }, [movieId]);

  return (
    <div className={css.container}>
      {movieCast.length > 0 && (
        <ul className={css.castList}>
          {movieCast.map((item) => (
            <li className={css.castListItem} key={item.id}>
              <img
                className={css.castImg}
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                    : defaultImg
                }
                alt="photo"
              />
              <h2 className={css.castName}>{item.name}</h2>
              <p className={css.castCharacter}>
                Character: <span>{item.character}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
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
