import React, { PropTypes } from 'react';
import { Link } from 'react-router/es';
import styles from './App.css';

const App = ({ children }) => (
  <div className={styles.base}>
    <header className={styles.header}>
      <h1>YARS</h1>
      <p>Yet Another React Starter</p>
    </header>
    <nav className={styles.nav}>
      <ul>
        <li><Link to="/todo" activeClassName="active">Todo</Link></li>
        <li><Link to="/counter" activeClassName="active">Counter</Link></li>
      </ul>
    </nav>
    <div className={styles.example}>
      {children}
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.element,
};

export default App;
