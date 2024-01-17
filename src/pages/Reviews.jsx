import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import css from '../pages/Reviews.module.css';

import { requestMovieReview } from 'services/api';

const Reviews = () => {
  const { movieId } = useParams();

  const [status, setStatus] = useState('idle');
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        setStatus('pending');
        const reviews = await requestMovieReview(movieId);
        setReviews(reviews);
        setStatus('success');
      } catch (error) {
        toast(error.message);
      }
    };
    fetchMovieReviews();
  }, [movieId]);

  return (
    <ul className={css.list}>
      {Array.isArray(reviews) && reviews.length === 0 && (
        <p className={css.alert}>We don't have any reviews!</p>
      )}
      {status === 'success' &&
        reviews.map(review => (
          <li key={review.id} className={css.item}>
            <h3 className={css.name}>
              Author: {review.author_details.username}
            </h3>
            <p>{review.content}</p>
          </li>
        ))}
    </ul>
  );
};
export default Reviews;
