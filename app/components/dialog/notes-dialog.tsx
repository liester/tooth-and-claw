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
  textarea: { width: '99%' },
}));
export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  customer: Customer;
  onAddOrUpdateNote: (note: string, id: string) => void;
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
      fullWidth
    >
      <DialogTitle id="form-dialog-title">Add Customer</DialogTitle>
      <DialogContent>
        <TextareaAutosize
          className={classes.textarea}
          rowsMin={10}
          rowsMax={10}
          aria-label="maximum height"
          placeholder="Add notes here"
          defaultValue={note}
          onChange={(event) => setNote(event.target.value)}
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
