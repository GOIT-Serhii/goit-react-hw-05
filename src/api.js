import axios from "axios";

const KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDQ3ZTY0YTNjNDFlOGFiNDcwMzU4ZjhlMmE0OGIwNCIsIm5iZiI6MTcyNTUzNTI5NS42MTUwMjgsInN1YiI6IjY2ZDc1YzdlM2NhZGNkNGU4ZWY1NmUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a2XE9MMaH3stGvOKR6RX8C_egpEmje1jumIsW4EoBrQ";

export const fetchTopMovies = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/week",
    {
      params: {
        language: "en-US",
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${KEY}`,
      },
    }
  );

  return response.data;
};

export const getMovieById = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      params: {
        language: "en-US",
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${KEY}`,
      },
    }
  );
  return response.data;
};

export const getMovieCastById = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    {
      params: {
        language: "en-US",
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${KEY}`,
      },
    }
  );
  return response.data;
};

export const getMovieReviewById = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
    {
      params: {
        language: "en-US",
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${KEY}`,
      },
    }
  );
  return response.data;
};

export const searchMovie = async (userInput) => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: userInput,
        include_adult: "false",
        language: "en-US",
        page: "1",
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${KEY}`,
      },
    }
  );
  return response.data;
};
