import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

// const useStyles = makeStyles({});

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  onAddCustomer: (name: string, email: string, phone: string) => void;
}

export default function AddCustomerDialog(props: SimpleDialogProps) {
  // const classes = useStyles();
  const { onClose, onAddCustomer } = props;

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open>
      <DialogTitle id="form-dialog-title">Add Customer</DialogTitle>
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
          onClick={() => onAddCustomer(name, email, phone)}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
