import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { MoviesList } from 'components/MoviesList/MoviesList';
import css from '../Home/Home.module.css';

import { requestMoviesTrend } from 'services/api';

const Home = () => {
  const [status, setStatus] = useState('idle');
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchMoviesTrend = async () => {
      try {
        setStatus('pending');
        const movies = await requestMoviesTrend();
        setMovies(movies);
        setStatus('success');
      } catch (error) {
        toast(error.message);
      }
    };
    fetchMoviesTrend();
  }, []);

  const showMoviesTrend = status === 'success' && movies.length > 0;
  return (
    <>
      <h1 className={css.title}>Trending today</h1>
      <ul className={css.moviesList}>
        {showMoviesTrend && <MoviesList movies={movies} />}
      </ul>
    </>
  );
};
export default Home;
