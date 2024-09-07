import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

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
        setMovieREview(res.results);
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
    <div className={css.container}>
      {movieReview.length === 0 && (
        <p>We don't have any reviews for this movie</p>
      )}
      {movieReview.length > 0 && (
        <ul className={css.reviewList}>
          {movieReview.map((item) => (
            <li className={css.reviewListItem} key={item.id}>
              <h3>{item.author}</h3>
              <p>{item.content}</p>
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
