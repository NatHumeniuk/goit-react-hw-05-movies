import { NavLink } from 'react-router-dom';

import css from './SharedLayout.module.css';

const SharedLayout = ({ children }) => {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <nav className={css.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${css.headerLink} ${isActive ? css.active : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `${css.headerLink} ${isActive ? css.active : ''}`
            }
          >
            Movies
          </NavLink>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default SharedLayout;
