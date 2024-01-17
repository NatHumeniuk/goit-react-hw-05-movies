import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import css from './BackLink.module.css';

export const BackLink = ({ to, children }) => {
  return (
    <div>
      <Link to={to} className={css.backLink}>
        <HiArrowLeft size="24" />
        {children}
      </Link>
    </div>
  );
};
