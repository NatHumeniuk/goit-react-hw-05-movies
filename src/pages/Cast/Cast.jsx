import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { defaultImg } from 'units/defaultUnit';

import css from '../Cast/Cast.module.css';

import { requestMovieCast } from 'services/api';

const Cast = () => {
  const { movieId } = useParams();
  const [status, setStatus] = useState('idle');
  const [cast, setCast] = useState(null);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        setStatus('pending');
        const cast = await requestMovieCast(movieId);
        setCast(cast);
        setStatus('success');
      } catch (error) {
        toast(error.message);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  return (
    <ul className={css.castList}>
      {Array.isArray(cast) && cast.length === 0 && (
        <p className={css.alert}>No information!</p>
      )}
      {status === 'success' &&
        cast.map(actor => (
          <li key={actor.id} className={css.castItem}>
            <img
              className={css.photo}
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : defaultImg
              }
              alt={actor.name}
            />
            <div className={css.castInfoWrap}>
              <h3 className={css.name}>{actor.original_name}</h3>
              <p>
                <span className={css.subtitle}>Character: </span>
                {actor.character}
              </p>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default Cast;
