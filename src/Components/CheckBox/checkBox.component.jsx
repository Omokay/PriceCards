import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Typography } from '@material-ui/core';

const CheckBox = ({checked, onchange, textClick}) => {
    return (
        <FormControl component='fieldset'>
            <FormGroup aria-label='position' row>
                <FormControlLabel
                    value='end'
                    control={
                        <Checkbox
                            checked={checked}
                            onChange={onchange}
                            style = {{
                                margin: 'auto 0',
                                color: 'rgb(221, 24, 67)',

                            }}
                             />
                    }
                    labelPlacement='end'/>
                <Typography style={{
                    color: 'rgb(24, 43, 58)',
                    fontSize: '14px',
                    marginTop: '12px',
                }}>I have read the <span style={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontWeight: 'bold',
                    color: 'rgb(24, 43, 58)'
                }}><a onClick={textClick}>Terms and Conditions</a></span></Typography>
            </FormGroup>
        </FormControl>
    )
};

export default CheckBox;
