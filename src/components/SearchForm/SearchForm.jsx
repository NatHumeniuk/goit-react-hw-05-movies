import React from 'react';

import css from './SearchForm.module.css';

export const SearchForm = ({ handleSubmit }) => {
  return (
    <>
      <div className={css.searchbar}>
        <form className={css.form} onSubmit={handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Key word"
            name="searchInput"
          />
        </form>
      </div>
    </>
  );
};
