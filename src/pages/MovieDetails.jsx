import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useParams, useLocation, Link, Routes, Route } from 'react-router-dom';
import { toast } from 'react-toastify';

import { BackLink } from 'components/BackLink/BackLink';
import { Loader } from 'components/Loader/Loader';
import { defaultImg } from 'units/defaultUnit';

import css from './MovieDetails.module.css';

import { requestMovieById } from 'services/api';

const Cast = lazy(() => import('./Cast'));
const Reviews = lazy(() => import('./Reviews'));

const MovieDetails = () => {
  const { movieId } = useParams();

  const location = useLocation();
  const backLink = location.state?.from ?? '/';

  const [status, setStatus] = useState('idle');
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetailsById = async () => {
      try {
        setStatus('pending');
        const movieDetails = await requestMovieById(movieId);
        setMovieDetails(movieDetails);
        setStatus('success');
      } catch (error) {
        toast(error.message);
      }
    };
    fetchMovieDetailsById();
  }, [movieId]);

  const showMovieDetails = status === 'success';
  return (
    <>
      <BackLink to={backLink}>Go back</BackLink>

      {showMovieDetails && (
        <div className={css.container}>
          <div className={css.mainInfoWrap}>
            <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/original${movieDetails.poster_path}`
                  : defaultImg
              }
              alt={movieDetails.original_title}
              className={css.movieImg}
            />

            <div className={css.movieInfo}>
              <h1 className={css.title}>{movieDetails.original_title}</h1>
              <p className={css.info}>
                User score:{' '}
                {((movieDetails.vote_average / 10) * 100).toFixed(0)}%
              </p>
              <h2 className={css.subtitle}>Overview</h2>
              <p className={css.info}>{movieDetails.overview}</p>
              <h2 className={css.subtitle}>Genres</h2>
              <p className={css.info}>
                {movieDetails?.genres?.length > 0
                  ? movieDetails.genres.map(({ id, name }) => {
                      return <span key={id}>{name} &nbsp;</span>;
                    })
                  : 'There are no genres available'}
              </p>
            </div>
          </div>
          <div>
            <h2 className={css.subtitle}>Aditional information</h2>
            <ul>
              <li>
                <Link to="cast" className={css.link}>
                  Cast
                </Link>
              </li>
              <li>
                <Link to="reviews" className={css.link}>
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      <Suspense fallback={<Loader />}>
        <div>
          <Routes>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Routes>
        </div>
      </Suspense>
    </>
  );
};

export default MovieDetails;
