import React, { useEffect } from 'react';
import styles from './Home.css';
import CustomerList from './customer-list/CutomerList';
import db from '../utils/db';
import { Customer } from '../utils/types';

export default function Home(): JSX.Element {
  useEffect(() => {
    db.customers.find<Customer>({}).then((customers) => {
      console.log(`Loading ${customers.length} customers`);
    });
  }, []);
  return (
    <div className={styles.container}>
      <CustomerList />
    </div>
  );
}
