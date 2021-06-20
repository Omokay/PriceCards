import React, {useContext} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {PricingContext} from "../../Context/pricing.context";



const RadioButtonsGroup2 = ({ formLabel, name, value, radioButton, }) => {

    const {setIsUpfront} = useContext(PricingContext);

    const handleChange = async (event) => {
        console.log(event.target.value);
        await setIsUpfront(event.target.value);
    };

    return (
        <FormControl component="fieldset">
            <FormLabel style={{
                color: '#182b3a',
            }} component="legend">{formLabel}</FormLabel>
            <RadioGroup style={{
                margin: '0 auto',
            }} aria-label={name} name={name} value={value} onChange={handleChange}>
                {
                    radioButton.map((rbutton, index) => (
                        <FormControlLabel key={index} value={rbutton} control={<Radio />} label={rbutton}
                            // checked={form === forms[0]}

                        />

                    ))
                }

            </RadioGroup>
        </FormControl>
    );
}

export default RadioButtonsGroup2;
