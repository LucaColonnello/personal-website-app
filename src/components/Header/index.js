import React from 'react';
import Link from 'gatsby-link';

import './style.scss';

const Header = () => (
  <header className="header">

    <div className="container">
      <div className="header__title">
        <h1 className="title title--bordered">
          Luca Colonnello
        </h1>
      </div>

      <p className="header__text">
        <span className="label label--red">Full Stack Dev</span> ~&nbsp;
        <span className="label label--blue">JS</span>&nbsp;
        <span className="label label--blue">React.js</span>&nbsp;
        <span className="label label--blue">Redux</span>&nbsp;
        <span className="label label--blue">GraphQL</span>&nbsp;
        <span className="label label--blue">Node.js</span>
      </p>

      <nav className="main-nav">
        <Link
          to="/"
          className="main-nav__link"
          activeClassName="main-nav__link--active"
        >
          study log
        </Link>

        <a
          className="main-nav__link"
          href="https://uk.linkedin.com/in/luca-colonnello-77454526"
          target="_blank"
        >
          @me
        </a>
      </nav>
    </div>
  </header>
);

export default Header;
