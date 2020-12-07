import React from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(3),
      marginTop: theme.spacing(3)
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '99%',
    },
  }),
);

export default function StatusInput(props: any) {
    const classes = useStyles();
    return (
        <TextField id="outlined-full-width" 
        label="Add Post" 
        style={{ margin: 10 }} 
        placeholder="whats on your mind?" 
        fullWidth margin="normal"
        InputLabelProps={{ shrink: true }} 
        variant="outlined" 
        className={clsx(classes.margin, classes.textField)} 
        onChange={e => props.handlePost(e.target.value)}/>
    )
}