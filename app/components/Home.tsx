import React from 'react';
import styles from './Home.css';
import CustomerList from './customer-list/CutomerList';

export default function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <CustomerList />
    </div>
  );
}
