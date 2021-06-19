import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const CardExpiry = ({ label, defaultValue, error }) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: 400,

            },
        },
    }));

    const classes = useStyles();

    return (
        <div className='text-center'>
            <form className={classes.root} noValidate autoComplete='off'>
                <TextField
                    //error={error}
                    id="outlined-error-helper-text"
                    label={label}
                    //defaultValue={defaultValue}
                    // helperText="Incorrect entry."
                    variant="outlined"
                    required
                />
            </form>
        </div>
    )
};

export default CardExpiry;
