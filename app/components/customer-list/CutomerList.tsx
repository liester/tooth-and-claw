import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
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
import AddCustomerDialog from '../dialog/add-customer-dialog';
import DeleteCustomerDialog from '../dialog/delete-customer-dialog';
import EditCustomerDialog from '../dialog/edit-customer-dialog';

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
      color: 'rgb(35, 44, 57)',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1em',
  },
  search: {
    width: '30%',
  },
  addCustomer: {
    backgroundColor: 'rgb(35, 44, 57)',
    color: 'white',
  },
});

export default function CustomerList(): JSX.Element {
  const history = useHistory();
  const classes = useStyles();
  const [searchText, setSearchText] = useState<string>('');

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showAddCustomerDialog, setShowAddCustomerDialog] = useState<boolean>(
    false
  );
  const [showDeleteCustomerDialog, setShowDeleteCustomerDialog] = useState<
    boolean
  >(false);

  const [showEditCustomerDialog, setShowEditCustomerDialog] = useState<boolean>(
    false
  );

  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();

  const renderActions = (customer: Customer) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Edit
          className={classes.actionIcon}
          onClick={() => {
            setSelectedCustomer(customer);
            setShowEditCustomerDialog(true);
          }}
        />
        <Delete
          className={classes.actionIcon}
          onClick={() => {
            setSelectedCustomer(customer);
            setShowDeleteCustomerDialog(true);
          }}
        />
        <NoteAdd
          className={classes.actionIcon}
          onClick={() => history.push(`${routes.COUNTER}/${customer._id}`)}
        />
      </div>
    );
  };

  const refreshCustomers = () => {
    db.customers.find<Customer>({}).then((dbCustomers) => {
      console.log('got them customers');
      setCustomers(dbCustomers);
    });
  };

  useEffect(() => {
    refreshCustomers();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <TextField
          label="Search"
          onChange={(event) => setSearchText(event.target.value)}
          value={searchText}
          className={classes.search}
        />
        <Button
          variant="contained"
          className={classes.addCustomer}
          onClick={() => setShowAddCustomerDialog(!showAddCustomerDialog)}
        >
          Add Customer
        </Button>
      </div>
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
                  <TableCell align="right">{renderActions(customer)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showAddCustomerDialog && (
        <AddCustomerDialog
          open={showAddCustomerDialog}
          onClose={() => {
            setShowAddCustomerDialog(!showAddCustomerDialog);
          }}
          onAddCustomer={(name, email, phone) => {
            db.customers.insert({ name, email, phone });
          }}
        />
      )}
      {showDeleteCustomerDialog && (
        <DeleteCustomerDialog
          open={showDeleteCustomerDialog}
          onClose={() => setShowDeleteCustomerDialog(false)}
          customer={selectedCustomer}
          onDeleteCustomer={(customerId) => {
            db.customers
              .remove({ _id: customerId }, { multi: false })
              .then(() => {
                refreshCustomers();
                setShowDeleteCustomerDialog(false);
              });
          }}
        />
      )}
      {showEditCustomerDialog && (
        <EditCustomerDialog
          open={showEditCustomerDialog}
          onClose={() => setShowEditCustomerDialog(false)}
          customer={selectedCustomer}
          onEditCustomer={(name, email, phone, id) => {
            db.customers
              .update({ _id: id }, { name, email, phone }, { multi: false })
              .then(() => {
                refreshCustomers();
                setShowEditCustomerDialog(false);
              });
          }}
        />
      )}
    </div>
  );
}
