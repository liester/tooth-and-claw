import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import NoteAdd from '@material-ui/icons/NoteAdd';
import db from '../../utils/db';
import { Customer } from '../../utils/types';
import routes from '../../constants/routes.json';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    background: 'white',
  },
  actionIcon: {
    cursor: 'pointer',
    '&:hover': {
      background: 'lightgrey',
      borderRadius: '3px',
    },
  },
});

export default function CustomerList(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();
  const [searchText, setSearchText] = useState<string>('');

  const [customers, setCustomers] = useState<Customer[]>([]);

  const renderActions = (customerId: string) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Edit className={classes.actionIcon} />
        <Delete className={classes.actionIcon} />
        <NoteAdd
          className={classes.actionIcon}
          onClick={() => history.push(`${routes.COUNTER}/${customerId}`)}
        />
      </div>
    );
  };

  useEffect(() => {
    db.customers.find<Customer>({}).then((dbCustomers) => {
      console.log('got them customers');
      setCustomers(dbCustomers);
    });
  }, []);

  return (
    <div className={classes.container}>
      <TextField
        label="Search"
        onChange={(event) => setSearchText(event.target.value)}
        value={searchText}
      />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers
              .filter((customer: Customer): boolean => {
                const searchTextLowerCase = searchText.toLowerCase();
                return (
                  customer.name.toLowerCase().includes(searchTextLowerCase) ||
                  customer.email.toLowerCase().includes(searchTextLowerCase) ||
                  customer.phone.toLowerCase().includes(searchTextLowerCase)
                );
              })
              .map((customer: Customer) => (
                <TableRow key={customer.name}>
                  <TableCell component="th" scope="row">
                    {customer.name}
                  </TableCell>
                  <TableCell align="right">{customer.email}</TableCell>
                  <TableCell align="right">{customer.phone}</TableCell>
                  <TableCell align="right">
                    {renderActions(customer._id)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
