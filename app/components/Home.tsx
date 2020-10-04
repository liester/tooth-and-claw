import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import CustomerList from './customer-list/CutomerList';

export default function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <h2>Customer List</h2>
      <CustomerList />
      <Link to={routes.COUNTER}>to Counter</Link>
    </div>
  );
}
