import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Customer } from '../../utils/types';

const useStyles = makeStyles({
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  halfColumn: {
    width: '49%',
  },
  row: {
    display: 'flex',
  },
});

export interface DeleteCustomerDialogProps {
  open: boolean;
  onClose: () => void;
  customer?: Customer;
  onDeleteCustomer: (_id: string) => void;
}

export default function DeleteCustomerDialog(props: DeleteCustomerDialogProps) {
  const classes = useStyles();
  const { onClose, onDeleteCustomer, customer } = props;

  return (
    <div>
      {customer && (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open>
          <DialogTitle id="form-dialog-title">Delete Customer</DialogTitle>

          <DialogContent>
            <div className={classes.dialogContent}>
              <div className={classes.row}>
                <div style={{ paddingRight: '5px' }}>Name:</div>
                <div>{customer.name}</div>
              </div>
              <div className={classes.row}>
                <div style={{ paddingRight: '5px' }}>Email:</div>
                <div>{customer.email}</div>
              </div>
              <div className={classes.row}>
                <div style={{ paddingRight: '5px' }}>Phone:</div>
                <div>{customer.phone}</div>
              </div>
            </div>
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
