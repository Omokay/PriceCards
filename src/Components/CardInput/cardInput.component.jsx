import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';






const CardInput = ({ image, label, labelWidth, name, value, handleChange, type, onFocus, pattern,required }) => {


    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '400px',
            paddingBottom: '10px',
        },
    }));


    const classes = useStyles();

    return (
        <div className='text-center'>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={type}
                    value={value}
                    onChange={handleChange}
                    onFocus={onFocus}
                    name={name}
                    required = {required}
                    pattern={pattern}
                    endAdornment={
                        <InputAdornment position="end">
                            <img src={image} alt='card' />
                        </InputAdornment>
                    }
                    labelWidth={labelWidth}
                />
            </FormControl>
        </div>
    )
};

export default CardInput;
