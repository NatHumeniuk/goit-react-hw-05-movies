import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import css from './MoviesList.module.css';

import { defaultImg } from 'units/defaultUnit';

export const MoviesList = ({ movies }) => {
  const location = useLocation();

  return (
    <>
      {Array.isArray(movies) && movies.length === 0 && (
        <p className={css.alert}>No movies found!</p>
      )}

      {Array.isArray(movies) &&
        movies.map(movie => (
          <li key={movie.id} className={css.movieItem}>
            <NavLink
              to={`/movies/${movie.id}`}
              state={{ from: location }}
              className={css.movieLink}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    : defaultImg
                }
                alt={movie.original_title}
                className={css.movieImg}
              />

              <h2 className={css.movieTitle}> {movie.title}</h2>
            </NavLink>
          </li>
        ))}
    </>
  );
};
