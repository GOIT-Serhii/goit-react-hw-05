import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";
import { ColorRing } from "react-loader-spinner";

import { searchMovie } from "../../api";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movieSearch, setMovieSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [params, setParams] = useSearchParams();

  const handlerSubmit = (value) => {
    params.set("movie_search", value);
    setParams(params);
  };

  const userValue = params.get("movie_search");

  useEffect(() => {
    async function fetchSearchMovie() {
      try {
        setLoading(true);
        setError(false);
        const res = await searchMovie(userValue);
        setMovieSearch(res.results);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchSearchMovie();
  }, [userValue]);

  return (
    <div>
      <Formik
        initialValues={{ userInput: "" }}
        onSubmit={(values, actions) => {
          if (values.userInput.trim() === "") {
            toast.error("You need to type something");
          } else {
            handlerSubmit(values.userInput.trim());
            actions.resetForm();
          }
        }}
      >
        <Form className={css.form}>
          <Field
            className={css.input}
            type="text"
            name="userInput"
            placeholder="Type movie you want to find"
          />
          <button className={css.sbtBtn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
      <Toaster position="top-center" reverseOrder={false} />

      {movieSearch.length > 0 && <MovieList movie={movieSearch} />}
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
