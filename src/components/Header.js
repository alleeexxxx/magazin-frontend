import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Waves</Link>
        </li>
        <li>
          <Link to="/fire">Fire</Link>
        </li>
        <li>
          <Link to="/hurricane">Hurricane</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
