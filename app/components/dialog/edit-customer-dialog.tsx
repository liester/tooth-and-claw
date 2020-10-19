import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { Customer } from '../../utils/types';

// const useStyles = makeStyles({});

export interface EditCustomerDialogProps {
  open: boolean;
  onClose: () => void;
  customer?: Customer;
  onEditCustomer: (
    name: string,
    email: string,
    phone: string,
    id: string
  ) => void;
}

export default function EditCustomerDialog(props: EditCustomerDialogProps) {
  // const classes = useStyles();
  const { onClose, onEditCustomer, customer } = props;

  const [name, setName] = useState<string>(customer.name);
  const [email, setEmail] = useState<string>(customer.email);
  const [phone, setPhone] = useState<string>(customer.phone);
  const [id] = useState<string>(customer._id);

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open>
      <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="tel"
          fullWidth
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          margin="dense"
          label="Phone"
          type="tel"
          fullWidth
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          disabled={!name || !email || !phone}
          onClick={() => onEditCustomer(name, email, phone, id)}
          color="primary"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
