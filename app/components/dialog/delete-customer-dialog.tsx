import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { Customer } from '../../utils/types';

// const useStyles = makeStyles({});

export interface DeleteCustomerDialogProps {
  open: boolean;
  onClose: () => void;
  customer?: Customer;
  onDeleteCustomer: (_id: string) => void;
}

export default function DeleteCustomerDialog(props: DeleteCustomerDialogProps) {
  // const classes = useStyles();
  const { onClose, onDeleteCustomer, customer } = props;

  return (
    <div>
      {customer && (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open>
          <DialogTitle id="form-dialog-title">Delete Customer</DialogTitle>

          <DialogContent>
            <h3>{customer.name}</h3>
            <h3>{customer.email}</h3>
            <h3>{customer.phone}</h3>
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => onDeleteCustomer(customer._id)}
              color="primary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
