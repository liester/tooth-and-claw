import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../../utils/db';
import routes from '../../constants/routes.json';
import { Customer, Note } from '../../utils/types';
import styles from './Counter.css';

export default function Counter(props: any) {
  const { userId } = props;
  const [notes, setNotes] = useState<Note[]>([]);
  const [customer, setCustomer] = useState<Customer>();
  useEffect(() => {
    db.notes
      .find<Note>({ userId })
      .then((dbNotes) => {
        setNotes(dbNotes);
      });
    db.customers
      .findOne<Customer>({ _id: userId })
      .then((dbCustomer) => setCustomer(dbCustomer));
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <Link to={routes.HOME} data-tid="backButton">
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
        <div className={styles.customerName}>{customer?.name}</div>
      </div>
      {notes.map((note) => {
        return <div key={note._id}>{note}</div>;
      })}
    </div>
  );
}
