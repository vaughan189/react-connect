import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function AlertSnackbar(props: any) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Snackbar open={props.open} autoHideDuration={2000} onClose={props.handleClose}>
                <Alert severity="error">
                    {props.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default AlertSnackbar;