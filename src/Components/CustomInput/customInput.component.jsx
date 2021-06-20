import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import clsx from "clsx";


const CustomInput = ({ name, type, label, handleChange, placeholder, value, labelWidth }) => {

    const useStyles = makeStyles((theme) => ({
        root: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            margin: {
                margin: theme.spacing(1),
            },
            textField: {
                width: '400px',
            }}
            ));

    const classes = useStyles();

    return (
        <div className='text-center'>
            <form className={clsx(classes.root, classes.margin)} noValidate autoComplete='off'>
                <TextField   className={classes.textField}
                    //error={error}
                    id="outlined-error-helper-text"
                    label={label}
                    name={name}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    labelWidth={labelWidth}
                    variant="outlined"
                    onChange={handleChange}
                    required
                />
            </form>
        </div>
    )
};

export default CustomInput;
