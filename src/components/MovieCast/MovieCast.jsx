import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
        setMovieCast(res);
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
    <div>
      {movieCast.cast?.length > 0 && (
        <ul>
          {movieCast.cast.map((item) => (
            <li key={item.id}>
              <img
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                    : defaultImg
                }
                alt="photo"
              />
              <p>{item.name}</p>
              <p>Character: {item.character}</p>
            </li>
          ))}
        </ul>
      )}
      {error && <b>ERROR!!!</b>}
      {loading && <b>LOADING</b>}
    </div>
  );
}
