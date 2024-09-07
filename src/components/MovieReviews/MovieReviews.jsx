import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getMovieReviewById } from "../../api";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();

  const [movieReview, setMovieREview] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovieReview() {
      try {
        if (!movieId) return;
        setLoading(true);
        setError(false);
        const res = await getMovieReviewById(movieId);
        setMovieREview(res);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieReview();
  }, [movieId]);

  return (
    <div>
      {movieReview.results?.length > 0 && (
        <ul>
          {movieReview.results.map((item) => (
            <li key={item.id}>
              <h3>{item.author}</h3>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      )}
      {error && <b>ERROR!!!</b>}
      {loading && <b>LOADING</b>}
    </div>
  );
}
