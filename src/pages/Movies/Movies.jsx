import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import css from '../Movies/Movies.module.css';

import { requestMovieByQuery } from 'services/api';

import { Loader } from 'components/Loader/Loader';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { SearchForm } from 'components/SearchForm/SearchForm';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState(null);
  const query = searchParams.get('query');

  useEffect(() => {
    if (query === null) return;

    const fetchMovieByQuery = async () => {
      try {
        setIsLoading(true);
        const movies = await requestMovieByQuery(query);

        setMovies(movies);
      } catch (error) {
        toast(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieByQuery();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const searchValue = e.currentTarget.elements.searchInput.value;
    if (!searchValue) {
      toast('Please enter a search query');
      return;
    }
    setSearchParams({
      query: searchValue,
    });
  };

  return (
    <>
      <SearchForm handleSubmit={handleSubmit} query={query} />
      <div>
        {isLoading && <Loader />}
        <ul className={css.moviesList}>
          {movies?.length > 0 && <MoviesList movies={movies} />}
          {Array.isArray(movies) && movies.length === 0 && (
            <p className={css.alert}>Nothing found!</p>
          )}
        </ul>
      </div>
    </>
  );
};
export default Movies;
