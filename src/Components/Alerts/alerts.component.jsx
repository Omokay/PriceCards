import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Alerts = ({ open, severity, errorMessage, handleClose}) => {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}>

                <Alert onClose={handleClose}
                severity={severity}>
                {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}


export default Alerts;
