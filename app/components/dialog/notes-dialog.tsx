import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { TextareaAutosize } from '@material-ui/core';
import { Customer } from '../../utils/types';

const useStyles = makeStyles(() => ({
  paper: { minWidth: '500px' },
}));
export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  customer?: Customer;
  onAddOrUpdateNote: (note, id) => void;
}

export default function NoteDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onClose, customer, onAddOrUpdateNote } = props;

  const [note, setNote] = useState<string>(customer.note || '');

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open
      classes={{ root: classes.paper }}
    >
      <DialogTitle id="form-dialog-title">Add Customer</DialogTitle>
      <DialogContent>
        <TextareaAutosize
          rowsMin={10}
          rowsMax={10}
          aria-label="maximum height"
          placeholder="Maximum 4 rows"
          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua."
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => onAddOrUpdateNote(note, customer._id)}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
